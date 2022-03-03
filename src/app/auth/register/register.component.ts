import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../shared/validators/must-match.validator';
import { AuthService } from '../../core/services/auth.service';
import { NotificationPopupComponent } from '../../shared/components/notification-popup/notification-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUp: FormGroup;
  hide = true;
  hide_rp = true;
  vendorId: any;
  eventId: any;
  token: any;
  email: any;
  firstName: string = '';
  lastName: string ='';


  constructor(private fb: FormBuilder, private authSrv: AuthService,
     private dialog: MatDialog,
     private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.authSrv.setError(null);
    /* this.route.queryParamMap.subscribe(params => {
      this.vendorId = params.get("vId");
      this.eventId = params.get("eventId");
      this.token = params.get("token");
      this.email = params.get("email");
      this.firstName = params.get("fname");
      this.lastName = params.get("lname");
    }) */

    this.createForm(this.email);
    if(this.email && this.email != ''){
    this.signUp.get("email").disable();
    }
  }

  createForm(email) {
    this.signUp = this.fb.group({
      'email': [email, {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',

      }],
      'password': ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6), Validators.pattern(/^(\S*)$/)]],
      'repeat_password': ['', [Validators.required]],
      'first_name': [this.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      'last_name': [this.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    }, {
        validator: MustMatch('password', 'repeat_password')
    });
  }
  get f() { return this.signUp.controls; }
  getError(control) {
    switch (control) {
      case 'email':
        return this.signUp.get('email').hasError('email') ? 'Please enter valid email' :
          this.signUp.get('email').hasError('required') ? 'Please enter email' : ''; 
      case 'password':
        return this.signUp.get('password').hasError('required') ? 'Please enter password' :
          this.signUp.get('password').hasError('pattern') ? 'Password can\'t contain whitespace' :
            (this.signUp.get('password').hasError('minlength') || this.signUp.get('password').hasError('maxlength')) ?
              'Password should be between 6 and 20 characters long' : '';
      case 'repeat_password':
        return this.signUp.get('repeat_password').hasError('required') ? 'Passwords don\'t match' :
          this.signUp.get('repeat_password').hasError('mustMatch') ? 'Passwords don\'t match' : '';
      case 'first_name':
        return this.signUp.get('first_name').hasError('required') ? 'Please enter First Name' :
          (this.signUp.get('first_name').hasError('minlength') || this.signUp.get('first_name').hasError('maxlength')) ? 'First name should be between 2 and 50 characters long' : '';
      case 'last_name':
        return this.signUp.get('last_name').hasError('required') ? 'Please enter Last Name' :
          (this.signUp.get('last_name').hasError('minlength') || this.signUp.get('last_name').hasError('maxlength')) ? 'Last name should be between 2 and 50 characters long' : '';

    }
  }
  redirectToLogin() {
    this.authSrv.setSwitchMode("SignIn");
    this.router.navigate(['/login']);
  }
  onSubmit(form) {
    if (form.valid) {
      this.authSrv.setLoader(true);
      this.authSrv.signUp(form.getRawValue()).subscribe(
        (data: any) => {
          this.openDialog(data.message);
          this.redirectToLogin();

        }, (err) => {
          if (err !== undefined) {
            this.openDialog(err.message);
            //form.resetForm();
          }
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
