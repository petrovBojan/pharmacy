import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { ProductsService } from '../core/services/products.service';
import { NotificationPopupComponent } from '../shared/components/notification-popup/notification-popup.component';
import { Products } from '../shared/helpers/interfaces/products.interface';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  logged;
  searchInput: string = '';
  productGroup = [{id: 0, name: 'Настинка и грип'},{id: 1, name: 'Против Болка'}, {id: 2, name: 'Витамини и суплименти'}, {id: 3, name: 'Нега и заштита'}, {id: 4, name: 'Бебешка програма'}, {id: 5, name: 'Дентална програма'}, {id: 6, name: 'Медицинки помагала'}, {id: 7, name: 'Друго'}];
  productTypes = [{id: 0, name: 'Капсули'},{id: 1, name: 'Сируп'}, {id: 2, name: 'Капки'}, {id: 3, name: 'Прашок'}, {id: 4, name: 'Таблети'}, {id: 5, name: 'Друго'}];
  manufacturers = [{id: 0, name: 'Алкалоид АД Скопје'},{id: 1, name: 'Хемофарм'}, {id: 2, name: 'Крка-фарма'}, {id: 3, name: 'Плива'}, {id: 3, name: 'Лек'}, {id: 4, name: 'Реплек'}, {id: 5, name: 'Друго'}];
  
  lekovi;
  //products$: Observable<Products>;

  public products = new BehaviorSubject<Products>(null);
  public products$ = this.products.asObservable();
  
  subscription = new Subscription();
  manufacturer;
  group;
  isSaved;

  constructor(private productSrv: ProductsService, private authSrv: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.logged = this.authSrv.getLoggedUserId();

    this.getProducts();

    
    this.subscription.add(this.productSrv.getProductTypes().subscribe(
      (data: any) => {
        this.productTypes = data;
      }))

    this.subscription.add(this.productSrv.getProductGroups().subscribe(
      (data) => {
        this.productGroup = data;
      }))

    this.subscription.add(this.productSrv.getManufacturers().subscribe(
      (data: any) => {
        this.manufacturers = data;
      }))
  }

  getProducts() {
    this.subscription.add(this.productSrv.getProducts().subscribe(
      (data: any) => {
        this.lekovi = data;
        this.products$ = this.productSrv.products$;
        const saved = JSON.parse(localStorage.getItem("saved") || "[]");

      }))
  }

  onSaved(val){
    this.isSaved = val;
    if (this.isSaved === true) {
      this.products.next(JSON.parse(localStorage.getItem("saved") || "[]"));
      this.products$ = this.products;
    } else {
      this.getProducts();
    }
  }

  onManufacturerSelect(event) {
    if (event.value === 'All') {
      this.manufacturer = '';
    } else {
      this.manufacturer = event.value;
    }
    
  }

  onGroupSelect(event) {
    if (event.value === 'All') {
      this.group = '';
    } else {
      this.group = event.value;
    }
    
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        
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

  openDialog(message): void {
    setTimeout(() => this.dialog.open(NotificationPopupComponent, {
      width: '400px',
      data: message,
      panelClass: 'modalbox-purple'
    }));
  }

}
