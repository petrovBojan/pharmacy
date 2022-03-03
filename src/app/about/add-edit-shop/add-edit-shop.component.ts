import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-add-edit-shop',
  templateUrl: './add-edit-shop.component.html',
  styleUrls: ['./add-edit-shop.component.css']
})
export class AddEditShopComponent implements OnInit {

  addShopForm: FormGroup;
  formObs: Observable<any>;
  subscription = new Subscription();
  private readonly topicRegex: RegExp = /^[\w]+([-\s]{1}[a-z0-9]+)*$/i;
  productGroup;
  productTypes;
  manufacturers;
  companies;

  shop;

  searchText: string = '';

  isLoading = false;
  isSubmitted = false;
  term = '';
  isPromo = true;


  @ViewChild('auto', { static: false }) matAutocomplete: ElementRef;
  @ViewChild(MatAutocompleteTrigger) topicAutocompleteTrigger: MatAutocompleteTrigger;
  public logoPath: string = '';
  public logoName: string = '';
  public logo: File = null;
  public logoErrorMessage: string = '';

  options;

  constructor(private fb: FormBuilder,
  
    private router: Router,
    public dialogRef: MatDialogRef<AddEditShopComponent>,
    private dialog: MatDialog,
    private productSrv: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
    this.createForm();
    this.shop = this.data.shop;
    
    if (this.shop) {
      this.addShopForm.get('name').setValue(this.shop.Name);
      //this.addShopForm.get('status').setValue(this.shop.Status);
      this.addShopForm.get('address').setValue(this.shop.address);
      this.addShopForm.get('contact').setValue(this.shop.contact);
    }
  }

  createForm() {
    this.addShopForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      //'status': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'address': [],
      'contact': [],
    },
    )
  }

  getError(control) {
    switch (control) {
      case 'name':
        return this.addShopForm.get('name').hasError('required') ? 'Името на производот е задолжително' :
          (this.addShopForm.get('name').hasError('minlength') || this.addShopForm.get('name').hasError('maxlength')) ? 'Името на производот треба да биде содржи помеѓу 3 и 150 карактери' : '';
      case 'name':
      case 'address':
        return this.addShopForm.get('address').hasError('maxlength') ? 'Описот на производот треба да биде содржи најмногу 1000 карактери' : '';
      case 'contact':
        return this.addShopForm.get('productType').hasError('required') ? 'Одбери тип на производ' : '';;
    }
  }

  
  submit(form) {
    if (form.valid) {
      this.isSubmitted = true;
      if (this.shop) {
        this.formObs =  this.productSrv.editShop(this.shop.ShopID, form.value)
      } 
      else {
        this.formObs =  this.productSrv.addShop(form.value)
      }
      this.subscription.add(this.formObs.subscribe(
        (data) => {
          //MessageUtils.displayNotification(this.dialog, data.message, '80%', '50%');
          if (data === 1) {
            this.dialogRef.close(true);
            console.log(form.value);
          }
          if (data === 0) {
            setTimeout(() => {0
              this.isSubmitted = false;
            }, 2000);
          }
        },
        (err) => {
          if (err) {
            //MessageUtils.displayNotification(this.dialog, ErrorMessage.UNEXPECTED_ERR);
          }
          this.isSubmitted = false;
        }
      ));
    }
      
}
  onClose() {
    this.dialogRef.close();
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
