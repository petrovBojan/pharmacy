import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AddProductComponent } from '../all-products/add-product/add-product.component';
import { AuthService } from '../core/services/auth.service';
import { ProductsService } from '../core/services/products.service';
import { NotificationPopupComponent } from '../shared/components/notification-popup/notification-popup.component';
import { AddEditShopComponent } from './add-edit-shop/add-edit-shop.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  logged;
  subscription = new Subscription();
  shops;

  constructor(private productSrv: ProductsService, private authSrv: AuthService,  private dialog: MatDialog) { }

  ngOnInit(): void {
    this.logged = this.authSrv.getLoggedUserId();
    this.getShops();
  }

  onAddEdit(shop): void {
    const dialogRef = this.dialog.open(AddEditShopComponent, {
      data: {
        shop
      },
      closeOnNavigation: true,
      disableClose: true,
      width: '100%',
      maxHeight: 'calc(100vh - 75px)',
      maxWidth: '500px',
      panelClass: ['slideInRight', 'custom-modalbox','theme-styles-overwrite'],
    });
    this.subscription.add(
      dialogRef.afterClosed().pipe(
        switchMap((data) => {
          if (data) {
            this.getShops();
          } else {
            return  of(null)
          }
        })).subscribe(data => {
          if(data) {
            this.openDialog('Успешно го ажуриравте лекот');
          }
        }, (err) => {
          if (err && err.status !== 401) {
            this.openDialog('Something went wrong');
          }
      }
      ));
  }

  getShops() {
    this.productSrv.getShops().subscribe(
      (data: any) => {
        this.shops = data;
      })
  }

  removeShop(shop): void {
    const index = this.shops.indexOf(shop);
      this.shops.splice(index, 1);
      this.productSrv.deleteShop(shop.ShopID).subscribe(
        (data: any) => {
          this.getShops();
        }
      )
  }

  openDialog(message): void {
    setTimeout(() => this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    }));
  }

}
