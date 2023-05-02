import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  adminLogin(form: NgForm): void {
    if (form.valid) {
      this.authService.loginAdmin(form.value).subscribe(
        (d) => {
          if (d) {
            // store username in local storage
            localStorage.setItem('admin', "1");

            //navigate user to a new route
            this.route.navigate(['/admin/reservations']);
            form.reset();
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
      this.errorDisplay.nativeElement.innerHTML = `<small>Admin Email and Password must be provided</small>`;
    }
  }
}
