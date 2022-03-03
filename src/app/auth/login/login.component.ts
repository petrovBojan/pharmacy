import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';
import { NotificationPopupComponent } from '../../shared/components/notification-popup/notification-popup.component';
import { RegexPatternUtils } from '../../shared/utils/regex-pattern.utils';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  hide = true;
  errMsg: Observable<string>;
  isHandset: boolean;
  returnUrl: string;

  subscription = new Subscription();
  loginForm: FormGroup;
  formSubmitSubject$: Subject<any>;
  imgUrl = '';

  constructor(private authSrv: AuthService,  private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {

    this.imgUrl='../assets/images/biofarmtrans.png';
    //this.errMsg = this.authSrv.getErrorMsg();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.createForm();
  }

  

  createForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.pattern(RegexPatternUtils.EMAIL)]],
      'password': ['', [Validators.required]],
    });
  }
  get f() { return this.loginForm.controls; }
  getError(control) {
    switch (control) {
      case 'email':
          return this.loginForm.get('email').hasError('pattern') ? 'Внесете валидна е-маил адреса' :
            this.loginForm.get('email').hasError('required') ? 'Внесете е-маил адреса' : '';
      case 'password':
        return this.loginForm.get('password').hasError('required') ? 'Внесета лозинка' : '';

    }
  }
  login(form:FormGroup) {
    if(form.valid){
      this.authSrv.setLoader(true);
      this.authSrv.login(form).subscribe(data => {
        this.authSrv.setLoader(false);
        if (data ) {
          // login successful - redirect to return url
          this.router.navigate(['/home']);
        }
        else {
          this.authSrv.setLoader(false);
        }
      })
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
