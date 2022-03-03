import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationPopupComponent } from '../shared/components/notification-popup/notification-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading: Observable<boolean>;
  errMsg: Observable<string>;
  switchMode: BehaviorSubject<any>;
  eventId: any;
  vendorId: any;
  fromPublic: any;
  fromCheckout: any;
  imgUrl: string;

  constructor(private authSrv: AuthService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
    private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.imgUrl='../../assets/images/biofarmtrans.png';

    if (this.router.url.toLowerCase().indexOf("/register") == 0) {
      this.authSrv.setSwitchMode("SignUp");
    }

    let routePart = this.router.url;
    if (this.router.url.lastIndexOf('/') > 0) {
      routePart = this.router.url.substring(0, this.router.url.lastIndexOf('/'))
    }

    this.switchMode = this.authSrv.getSwitchMode();
    this.isLoading = this.authSrv.getLoader();
    this.errMsg = this.authSrv.getErrorMsg();
  }
  ngAfterViewInit(){
    this.cdr.detectChanges();
  }
  
  openDialog(message): void {
    this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    });
  }

}
