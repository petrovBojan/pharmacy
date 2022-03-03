import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationPopupComponent } from '../../shared/components/notification-popup/notification-popup.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fpForm: FormGroup;

  constructor(private fb: FormBuilder, private authSrv: AuthService, private dialog: MatDialog,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.fpForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]]
    });
  }
  getError(control) {
    switch (control) {
      case 'email': return this.fpForm.get('email').hasError('email') ? 'Please enter valid email' :
        this.fpForm.get('email').hasError('required') ? 'Please enter email' : '';
    }
  }
  get f() { return this.fpForm.controls; }

  onSubmit(form) {
    if (form.valid) {
      this.authSrv.forgotPassword(form.value).subscribe(
        (data: any) => {
          this.openDialog(data.message);
          this.authSrv.setSwitchMode("SignIn");
          this.router.navigate(['/login']);
        }
      )
    }
  }

  openDialog(message): void {
    setTimeout(() => this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    }));
  }
}
