import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  adminLogin(form: NgForm): void {
    this.authService.loginAdmin(form.value).subscribe(
      (d) => {
        if (d) {
          console.log(d)
          // store username in local storage
          localStorage.setItem('admin', d.username);

          //navigate user to a new route
          this.route.navigate(['/admin/transactions']);
          form.reset();
        }
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
