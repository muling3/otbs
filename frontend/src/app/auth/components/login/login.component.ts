import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  loginSubmit(form: NgForm): void {
    this.authService.loginUser(form.value).subscribe(
      (d) => {
        if (d) {
          this.route.navigate(['/']);
          form.reset();
        }
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
