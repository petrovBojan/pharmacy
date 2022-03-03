import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ProductsService } from '../core/services/products.service';
import { Products } from '../shared/helpers/interfaces/products.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lekovi;
  products$: Observable<Products>;
  subscription = new Subscription();
  manufacturer;
  group;
  logged;

  images = [
    {path: '../../assets/images/promo.jpg'},
    {path: '../../assets/images/promo1.jpg'},
    {path: '../../assets/images/promo2.jpg'},
    {path: '../../assets/images/promo3.jpg'},
    {path: '../../assets/images/promo4.jpg'},
    {path: '../../assets/images/promo5.jpg'},
  ]
  
  constructor(private productSrv: ProductsService, private authSrv: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.logged = this.authSrv.getLoggedUserId();

    this.subscription.add(this.productSrv.getProducts().subscribe(
      (data: any) => {
        this.lekovi = data;
        this.lekovi = data.filter(i =>i.Promo == true);
        this.products$ = this.productSrv.products$;
      }))

  }

}
