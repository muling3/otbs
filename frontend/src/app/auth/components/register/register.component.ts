import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  @ViewChild('test') testSmall!: ElementRef;

  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  registerSubmit(): void {
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe(
        (d) => {
          if (d) {
            this.route.navigate(['auth/']);
            this.registerForm.reset();
          }
        },
        (err) => {
          console.log('error', err);
          this.showWarning = true;
          this.errorDisplay.nativeElement.innerHTML = `<small>${err.error.message ? err.error.message: "Server Not Found"}</small>`;
          console.log(this.errorDisplay.nativeElement.textContent);
        }
      );
    } else {
      this.showWarning = true;
      this.errorDisplay.nativeElement.innerHTML = `<small>All fields are required</small>`;
    }
  }
}
