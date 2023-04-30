import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;
  username: String = ''
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("otbs-user") as string
    if(this.username) this.route.navigate(['/'])
  }

  loginSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.loginUser(form.value).subscribe(
        (d) => {
          if (d) {
            // store username in local storage
            localStorage.setItem('otbs-user', form.value.username);
            //navigate user to a new route
            this.route.navigate(['/']);
            form.reset();
          }
        },
        (err) => {
          console.log('error', err);
          this.showWarning = true;
          this.errorDisplay.nativeElement.innerHTML = `<small>${err.error.message}</small>`;
          console.log(this.errorDisplay.nativeElement.textContent);
        }
      );
    } else {
      this.showWarning = true;
      this.errorDisplay.nativeElement.innerHTML = `<small>Username and Password must be provided</small>`;
    }
  }
}
