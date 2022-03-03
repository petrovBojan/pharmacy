import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { RegexPatternUtils } from 'src/app/shared/utils/regex-pattern.utils'
import { ImageUtils } from 'src/app/shared/utils/image.utils';
import { ProductModel } from 'src/app/shared/helpers/models/add-product.model';
import { ProductsService } from 'src/app/core/services/products.service';
import { UploadService } from 'src/app/core/services/upload.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  formObs: Observable<any>;
  subscription = new Subscription();
  private readonly topicRegex: RegExp = /^[\w]+([-\s]{1}[a-z0-9]+)*$/i;
  productGroup;
  productTypes;
  manufacturers;
  companies;
  //productGroup = [{id: 0, name: 'Настинка и грип'},{id: 1, name: 'Против Болка'}, {id: 2, name: 'Витамини и суплименти'}, {id: 3, name: 'Нега и заштита'}, {id: 4, name: 'Бебешка програма'}, {id: 5, name: 'Дентална програма'}, {id: 6, name: 'Медицинки помагала'}, {id: 7, name: 'Друго'}];
  //productTypes = [{id: 0, name: 'Капсули'},{id: 1, name: 'Сируп'}, {id: 2, name: 'Капки'}, {id: 3, name: 'Прашок'}, {id: 4, name: 'Таблети'}, {id: 5, name: 'Друго'}];
  //manufacturers = [{id: 0, name: 'Алкалоид АД Скопје'},{id: 1, name: 'Хемофарм'}, {id: 2, name: 'Крка-фарма'}, {id: 3, name: 'Плива'}, {id: 3, name: 'Лек'}, {id: 4, name: 'Реплек'}, {id: 5, name: 'Друго'}];
  ourShops;
  //= [{val: false, id: 0, name: 'Био Фарм 1 Штип'},{val: true, id: 1, name: 'Био Фарм 2 Штип'}, {val: false, id: 2, name: 'Био Фарм Ињево'}];

  product;

  searchText: string = '';

  isLoading = false;
  isSubmitted = false;
  term = '';
  isPromo = true;


  @ViewChild('auto', { static: false }) matAutocomplete: ElementRef;
  @ViewChild(MatAutocompleteTrigger) topicAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('logoImg') logoImg: ElementRef;
  @ViewChild('logoInput') logoInput;
  public logoPath: string = '';
  public logoName: string = '';
  public logo: File = null;
  public logoErrorMessage: string = '';

  options;

  constructor(private fb: FormBuilder,
  
    private router: Router,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private dialog: MatDialog,
    private productSrv: ProductsService,
    private uploadSrv: UploadService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
    this.createForm();
    //this.createItem();
    this.product = this.data.product;
    
    if (this.product) {
      this.addProductForm.get('title').setValue(this.product.Title);
      this.addProductForm.get('description').setValue(this.product.Description);
      this.addProductForm.get('manufacturer').setValue(this.product.ManufacturerID);
      this.addProductForm.get('productGroup').setValue(this.product.ProductGroupID);
      this.addProductForm.get('productType').setValue(this.product.ProductTypeID);
      this.addProductForm.get('price').setValue(this.product.Price);
      this.addProductForm.get('quantity').setValue(this.product.Quantity);
      this.addProductForm.get('haveOnStock').setValue(this.product.HaveOnStock);
      //this.addProductForm.get('ourShops').setValue(this.product.Title);
      this.addProductForm.get('promo').setValue(this.product.Promo);
      this.addProductForm.get('image').setValue(this.product.Image);
      this.addProductForm.get('percentage').setValue(this.product.Percentage);
    }
    this.productSrv.getProductTypes().subscribe(
    (data: any) => {
      this.productTypes = data;
    })
    this.productSrv.getProductGroups().subscribe(
      (data) => {
        this.productGroup = data;
      }
    )
    this.productSrv.getManufacturers().subscribe(
      (data: any) => {
        this.manufacturers = data;
      })
      
   
  }

  createForm() {
    this.addProductForm = this.fb.group({
      'title': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      'description': [''],
      'manufacturer': [],
      'productGroup': [],
      'productType': [],
      'price': ['', [Validators.required, Validators.pattern(RegexPatternUtils.NUMBERS_ONLY)]],
      'quantity': ['', [Validators.required]],
      'haveOnStock' : [false],
      //'ourShops': this.fb.array([]),
      'promo': [true],
      'image': [''],
      'percentage': ['', [Validators.required, Validators.pattern(RegexPatternUtils.NUMBERS_ONLY)]]
    },
    )
  }
  get formData() { return this.addProductForm.get('ourShops') as FormArray; }

  /* createItem() {
    this.productSrv.getShops().subscribe(
      (data) => {
        this.ourShops = data;
        for (let item of this.ourShops) {
          this.formData.push(
            this.fb.group({
              shopId: [ item.ShopID],
              shopName: [item.Name],
            })
          );
        }
      }
    )
    
  } */
  onPromo(val){
    this.isPromo = val;
    if (this.isPromo === true) {
      this.addProductForm.get('percentage').setValidators([Validators.required, Validators.pattern(RegexPatternUtils.NUMBERS_ONLY)]);
      this.addProductForm.get('percentage').updateValueAndValidity();
    }
    if (this.isPromo === false) {
      this.addProductForm.get('percentage').clearValidators();
      this.addProductForm.get('percentage').updateValueAndValidity();
    }
  }
  onInputRate(val) {
    let taxrate = val;
    this.addProductForm.get('percentage').setValue(taxrate);
    if (+taxrate > 100) {
      this.addProductForm.get('percentage').setErrors({maximum: true});
    } 
    if (taxrate === '') {
      this.addProductForm.get('percentage').setErrors({required: true});
    }
  }
  getError(control) {
    switch (control) {
      case 'title':
        return this.addProductForm.get('title').hasError('required') ? 'Името на производот е задолжително' :
          (this.addProductForm.get('title').hasError('minlength') || this.addProductForm.get('title').hasError('maxlength')) ? 'Името на производот треба да биде содржи помеѓу 3 и 150 карактери' : '';
      case 'description':
        return this.addProductForm.get('description').hasError('maxlength') ? 'Описот на производот треба да биде содржи најмногу 1000 карактери' : '';
      case 'manufacturer':
        return this.addProductForm.get('manufacturer').hasError('required') ? 'Одбери производител' : '';
      case 'productType':
        return this.addProductForm.get('productType').hasError('required') ? 'Одбери тип на производ' : '';
      case 'price':
        return this.addProductForm.get('price').hasError('required') ? 'Цената е задолжителна' : 
        this.addProductForm.get('price').hasError('pattern') ? 'Внесете само бројки' :'';
      case 'quantity':
        return this.addProductForm.get('quantity').hasError('required') ? 'Количината е задолжителна' : '';
      case 'percentage':
        return this.addProductForm.get('percentage').hasError('required') ? 'Внеси процент за намаление на производот' : 
        this.addProductForm.get('percentage').hasError('pattern') ? 'Внесете само бројки' : 
        this.addProductForm.get('percentage').hasError('maximum') ? 'Намалението не може да биде повеќе од 100%' : '';
    }
  }

  onUploadLogoClick(): void {
    this.logoInput.nativeElement.click();
  }

  onLogoSelect(event): void {
    this.logoErrorMessage = '';

    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    if (!ImageUtils.isOfTypeImage(file.type)) {
      this.logoErrorMessage = "INVALID TYPE";
      return;
    }

    let maxSize = ImageUtils.maxEventLogoSize;
    if (file.size > maxSize) {
      let sizeDiff = ImageUtils.convertBytesToMB(file.size - maxSize);
      sizeDiff = +Number.parseFloat(sizeDiff.toString()).toFixed(2);
      maxSize = ImageUtils.convertBytesToMB(maxSize);
      this.logoErrorMessage = `Image size can not exceed ${maxSize} MB`;
      return;
    }

    this.logo = file;
    this.logoName = ImageUtils.truncate(file.name, 36);
    ImageUtils.displayUploadedImage(file, this.logoImg);
  }

  uploadLogo() {
    this.logo;
    this.logoName;
    this.uploadSrv.uploadFile(this.logo);
  }

  

  submit(form) {
    if (form.valid) {
      this.isSubmitted = true;
      if (this.product) {
        this.formObs =  this.productSrv.editProduct(this.product.ProductID, form.value)
      } 
      else {
        this.formObs =  this.productSrv.addProduct(form.value)
      }
      this.subscription.add(this.formObs.subscribe(
        (data) => {
          //MessageUtils.displayNotification(this.dialog, data.message, '80%', '50%');
          if (data) {
            this.dialogRef.close(true);
            console.log(form.value);
          }
          if (data === 0) {
            setTimeout(() => {
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
