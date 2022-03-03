import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ConfirmationPopupComponent } from 'src/app/shared/components/confirmation-popup/confirmation-popup.component';
import { NotificationPopupComponent } from 'src/app/shared/components/notification-popup/notification-popup.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { ViewProductComponent } from '../view-product/view-product.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  logged;
  @Input() lek;
  subscription = new Subscription();
  savedProducts = [];
  saved;

  constructor(private dialog: MatDialog, private authSrv: AuthService, private productSrv: ProductsService,) { }

  ngOnInit(): void {
    this.logged = this.authSrv.getLoggedUserId();

    this.savedProducts = JSON.parse(localStorage.getItem("saved") || "[]");
  }

  onSelect(product): void {
    const dialogRef = this.dialog.open(ViewProductComponent, {
      data: {
        product
      },
      closeOnNavigation: true,
      //disableClose: true,
      width: '100%',
      maxHeight: 'calc(100vh - 175px)',
      maxWidth: '700px',
      panelClass: ['slideInRight', 'custom-modalbox','theme-styles-overwrite'],
    });
    this.subscription.add(
      dialogRef.afterClosed().pipe(
        switchMap((data) => {
          if (data) {
            return this.productSrv.getProducts();
          } else {
            return  of(null)
          }
        })).subscribe(data => {
          if(data) {
            this.openDialog(data.message);
          }
        }, (err) => {
          if (err && err.status !== 401) {
            this.openDialog('Something went wrong');
          }
      }
      ));
  }
  onEdit(product): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        product
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
            return this.productSrv.getProducts();
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
  removeProduct(product) {
    const fullName = `${product.Title} `;
    const confirmationDialogRef = this.dialog.open(ConfirmationPopupComponent, {
      maxWidth: '80%',
      maxHeight: '90vh',
      data: {
        title: 'Бришење на продуктот',
        subtitle: `<p>Дали сте сигурни дека саката да го избришете <strong>${fullName}</strong> од листата на продукти?</p>`
      },
      disableClose: true,
      closeOnNavigation: true
    });
    this.subscription.add(confirmationDialogRef.afterClosed().subscribe(confirmation => {
      if(confirmation === true){
        this.productSrv.deleteProduct(product.ProductID).subscribe(
          (data:any) => {
            //if (data) {
              this.productSrv.getProducts().subscribe(
                  (data: any) => {
                    if(data){
                      return data;
                    }
                  }
                )
              this.openDialog(data.message);

            //}
          },
          (err) => {
            if (err && err.status !== 401) {
              this.openDialog('some error');
            }
           });
      }

    }));
}

  saveProduct(lek, save) {
    if (save) {
      this.savedProducts.splice(this.savedProducts.findIndex(a => a.ProductID === lek.ProductID) , 1)
      localStorage.setItem("saved", JSON.stringify(this.savedProducts));
    } else {
      this.savedProducts.push(lek);
      localStorage.setItem("saved", JSON.stringify(this.savedProducts));
    }
    
  }

  isProductSaved(product): boolean {
    for ( let i = 0; i < this.savedProducts.length; i++) {
    //this.savedProducts.forEach(element => {
      if (this.savedProducts[i].ProductID !== product.ProductID) {
        this.saved = false;
        continue
      } else {
        this.saved = true;
        break
      }
    }
    return this.saved;
  }

  openDialog(message): void {
    setTimeout(() => this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    }));
  }
}
