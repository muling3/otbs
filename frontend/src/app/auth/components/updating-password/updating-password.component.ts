import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updating-password',
  templateUrl: './updating-password.component.html',
  styleUrls: ['./updating-password.component.scss']
})
export class UpdatingPasswordComponent implements OnInit {
  @ViewChild('error') errorDisplay!: ElementRef;
  showWarning: Boolean = false;

  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit(): void {
  }
  resetSubmit(form: NgForm): void{
    if (form.valid) {
      this.authService.resetPassword(form.value).subscribe(
        (d) => {
          if (d) {
            this.route.navigate(['auth/']);
            form.reset();
          }
        },
        (err) => {
          this.showWarning = true;
          this.errorDisplay.nativeElement.innerHTML = `<small>${err.error.message ? err.error.message: "Server Not Found"}</small>`;
        }
      );
    } else {
      this.showWarning = true;
      this.errorDisplay.nativeElement.innerHTML = `<small>All fields are required</small>`;
    }
  }
}
