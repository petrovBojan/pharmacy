import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-snackbar',
  template: `
    <div class="d-flex justify-content-between align-items-center">
      <span [innerHTML]="data | sanitize:'html'"></span>
      <button mat-icon-button (click)="close()"><mat-icon>close</mat-icon></button>
    </div>`,
  styles: ['mat-icon {width: 20px; height: 20px; line-height: 20px !important; font-size: 20px}']
})
export class NotificationSnackbarComponent implements OnInit {
  clickedInside: boolean;
  @HostListener("click")
  clicked() {
    this.clickedInside = true;
  }
  @HostListener("document:click", ['$event'])
  clickedOut(event) {
    if(!this.clickedInside) {
      this.snackBar.dismiss();
    }
    this.clickedInside = false;
  }


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  close() {
    this.snackBar.dismiss();
  }
}
