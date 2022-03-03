import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MustMatch } from '../../shared/validators/must-match.validator';
import { NotificationPopupComponent } from '../../shared/components/notification-popup/notification-popup.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formChangePassword: FormGroup;
  hideNP = true;
  hideCP = true;
  switchMode: BehaviorSubject<any>;
  systemUserId: any;
  constructor(private fb: FormBuilder,private dialog: MatDialog, private authSrv: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.createForm();
  }
  createForm() {
    this.formChangePassword = this.fb.group({
      'new_password': ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6), Validators.pattern(/^(\S*)$/)]],
      'confirm_password': ['', [Validators.required]]
    }, {
      validator: MustMatch('new_password', 'confirm_password')
    });
  }
  getError(control) {
    switch (control) {
      case 'new_password':
        return this.formChangePassword.get('new_password').hasError('required') ? 'Please enter new password' :
          this.formChangePassword.get('new_password').hasError('pattern') ? 'Password can\'t contain whitespace' :
            (this.formChangePassword.get('new_password').hasError('minlength') || this.formChangePassword.get('new_password').hasError('maxlength')) ?
              'Password should be between 6 and 20 characters long' : '';
      case 'confirm_password':
        return this.formChangePassword.get('confirm_password').hasError('required') ? 'Passwords don\'t match' :
          this.formChangePassword.get('confirm_password').hasError('mustMatch') ? 'Passwords don\'t match' : '';
    }
  }
  onSubmit(form) {
    if (form.valid) {
      this.authSrv.changePassword(form.value, this.systemUserId, 1).subscribe(
        (data: any) => {
          this.openDialog(data.message);
          form.reset();
          if (data.status) {
            this.redirectToLogin();
          }
        },
        (err) => {
          this.openDialog(err.message);
          form.reset();
        }
      )
    }
  }
  redirectToLogin() {
    this.authSrv.setSwitchMode("SignIn");
    let params = {
    }
    this.router.navigate(['/login'], {queryParams : params});
  }
  openDialog(message): void {
    setTimeout(() => this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    }));
  }
}
