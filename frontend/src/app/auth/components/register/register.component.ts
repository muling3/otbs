import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  @ViewChild("registerForm") registerForm!: NgForm;

  constructor(private authService: AuthenticationService, private route: Router) {}

  ngOnInit(): void {}
  
  registerSubmit(): void {
    this.authService.registerUser(this.registerForm.value).subscribe(
      (d) => {
        if (d) {
          this.route.navigate(['auth/']);
          this.registerForm.reset();
        }
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
