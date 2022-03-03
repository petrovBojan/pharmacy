import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

//material
import { MatMenuModule } from '@angular/material/menu';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './all-products/view-product/view-product.component';
import { AddProductComponent } from './all-products/add-product/add-product.component';
import { ProductItemComponent } from './all-products/product-item/product-item.component';
import { EditProductComponent } from './all-products/edit-product/edit-product.component';
import { AboutComponent } from './about/about.component';
import { EmploeesComponent } from './emploees/emploees.component';
import { ViewEmploeeComponent } from './emploees/view-emploee/view-emploee.component';
import { AddEmploeeComponent } from './emploees/add-emploee/add-emploee.component';
import { EditEmploeeComponent } from './emploees/edit-emploee/edit-emploee.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PlusPharmaComponent } from './plus-pharma/plus-pharma.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from './settings/settings.component';
import { AddEditShopComponent } from './about/add-edit-shop/add-edit-shop.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';

export function jwtTokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    RegisterComponent,
    ChangePasswordComponent, 
    AllProductsComponent,
    ViewProductComponent,
    AddProductComponent,
    ProductItemComponent,
    EditProductComponent,
    AboutComponent,
    EmploeesComponent,
    ViewEmploeeComponent,
    AddEmploeeComponent,
    EditEmploeeComponent,
    HomeComponent,
    MainComponent,
    PlusPharmaComponent,
    SettingsComponent,
    AddEditShopComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,

    MatMenuModule,
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
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,

    IvyCarouselModule,
    MglTimelineModule,
    NgScrollbarModule,
    QuillModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
