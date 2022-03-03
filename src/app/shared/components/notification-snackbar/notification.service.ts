import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar'
import { NotificationSnackbarComponent } from './notification-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar ) {}

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
  }

  regular(msg:string) {
    this.config['panelClass'] = ['notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(NotificationSnackbarComponent, this.config);
  }

  success(msg:string) {
    this.config['panelClass'] = ['alert', 'alert-success', 'notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(NotificationSnackbarComponent, this.config);
  }

  error(msg:string) {
    this.config['panelClass'] = ['alert', 'alert-danger', 'notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(NotificationSnackbarComponent, this.config);
  }
  warn(msg: string) {
    this.config['panelClass'] = ['alert', 'alert-warning', 'notification'];
    this.config['data'] = msg;
    this.snackBar.openFromComponent(NotificationSnackbarComponent, this.config);
  }
}
