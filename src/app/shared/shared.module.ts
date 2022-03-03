import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoFocusDirective } from './directives/auto-focus.directive';
import { AutoGrowDirective } from './directives/auto-grow.directive';

import { FilterPipe } from './pipes/filter.pipe';
import { FilterManuPipe } from './pipes/filterManu.pipe';
import { FilterGroupPipe } from './pipes/filterGroup.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';

import { NotificationPopupComponent } from './components/notification-popup/notification-popup.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

//materials 

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MainNavComponent,
    NotificationPopupComponent,
    LoadingSpinnerComponent,
    AutoFocusDirective,
    FilterPipe,
    FilterManuPipe,
    FilterGroupPipe,
    TruncatePipe,
    AutoGrowDirective,
    SanitizePipe,
    NotificationSnackbarComponent,
    ConfirmationPopupComponent,
    ErrorPageComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  entryComponents: [
    NotificationPopupComponent,
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MainNavComponent,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    NotificationPopupComponent,
    LoadingSpinnerComponent,
    AutoFocusDirective,
    FilterPipe,
    FilterManuPipe,
    FilterGroupPipe,
    TruncatePipe,
    MatTooltipModule,
    AutoGrowDirective,
    SanitizePipe,
    MatRippleModule,
  ]
})

export class SharedModule { }
