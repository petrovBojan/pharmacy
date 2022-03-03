import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AuthComponent } from './auth/auth.component';
import { EmploeesComponent } from './emploees/emploees.component';
import { HomeComponent } from './home/home.component';
import { NoAuthGuard } from './core/guards/no-auth-guard.service';

import { MainComponent } from './main/main.component';
import { PlusPharmaComponent } from './plus-pharma/plus-pharma.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,  children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: AllProductsComponent,  },
      { path: 'settings', component: SettingsComponent,  },
      { path: 'about', component: AboutComponent },
      { path: 'emploees', component: EmploeesComponent,},
      { path: 'plus-pharma', component: PlusPharmaComponent,},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
 

  { path: 'login', canActivate: [NoAuthGuard], component: AuthComponent },
  { path: 'register', canActivate: [NoAuthGuard], component: AuthComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  //{ path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
