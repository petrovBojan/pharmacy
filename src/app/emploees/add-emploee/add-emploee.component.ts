import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { EmployeesService } from 'src/app/core/services/employes.service';
import { RegexPatternUtils } from 'src/app/shared/utils/regex-pattern.utils';

@Component({
  selector: 'app-add-emploee',
  templateUrl: './add-emploee.component.html',
  styleUrls: ['./add-emploee.component.css']
})
export class AddEmploeeComponent implements OnInit {

  addEmploeeForm: FormGroup;
  formObs: Observable<any>;
  subscription = new Subscription();
  private readonly topicRegex: RegExp = /^[\w]+([-\s]{1}[a-z0-9]+)*$/i;
  productGroup;
  productTypes;
  manufacturers;
  companies;

  employee;

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
    public dialogRef: MatDialogRef<AddEmploeeComponent>,
    private dialog: MatDialog,
    private productSrv: ProductsService,
    private employeesSrv: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
    this.createForm();
    this.employee = this.data.employee;
    if (this.employee) {
      this.addEmploeeForm.get('firstName').setValue(this.employee.firstname);
      this.addEmploeeForm.get('lastName').setValue(this.employee.lastname);
      this.addEmploeeForm.get('email').setValue(this.employee.email);
      this.addEmploeeForm.get('image').setValue(this.employee.image);
      this.addEmploeeForm.get('jobTitle').setValue(this.employee.jobtitle);
      this.addEmploeeForm.get('contact').setValue(this.employee.contact);
      this.addEmploeeForm.get('education').setValue(this.employee.education);
      this.addEmploeeForm.get('numberOfWorkYears').setValue(this.employee.workYearsNum);
    }
  }

  createForm() {
    this.addEmploeeForm = this.fb.group({
      'firstName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'lastName': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'email': ['', [Validators.pattern(RegexPatternUtils.EMAIL)] ],
      'image': [],
      'jobTitle': [],
      'contact': [],
      'education': [],
      'numberOfWorkYears': [],
    },
    )
  }

  getError(control) {
    switch (control) {
      case 'firstName':
        return this.addEmploeeForm.get('firstName').hasError('required') ? 'Името на вработениот е задолжително' :
          (this.addEmploeeForm.get('firstName').hasError('minlength') || this.addEmploeeForm.get('firstName').hasError('maxlength')) ? 'Името на вработениот треба да содржи помеѓу 3 и 150 карактери' : '';
      case 'firstName':
        return this.addEmploeeForm.get('lastName').hasError('required') ? 'Презимето на вработениот е задолжително' :
          (this.addEmploeeForm.get('lastName').hasError('minlength') || this.addEmploeeForm.get('lastName').hasError('maxlength')) ? 'Презимето на вработениот треба да содржи помеѓу 3 и 150 карактери' : '';
      case 'email':
        return this.addEmploeeForm.get('email').hasError('pattern') ? 'Внесете валидна Е-маил адреса' : '';
     /*  case 'jobTitle':
        return this.addEmploeeForm.get('jobTitle').hasError('required') ? 'Одбери производител' : '';
      case 'contact':
        return this.addEmploeeForm.get('contact').hasError('required') ? 'Одбери тип на производ' : '';
      case 'education':
        return this.addEmploeeForm.get('education').hasError('required') ? 'Цената е задолжителна' :'';
      case 'numberOfWorkYears':
        return this.addEmploeeForm.get('numberOfWorkYears').hasError('required') ? 'Внеси процент за намаление на производот' : ''; */
    }
  }

  
  submit(form) {
    if (form.valid) {
      this.isSubmitted = true;
      if (this.employee) {
        this.formObs =  this.employeesSrv.editEmployee(this.employee.ID, form.value)
      } 
      else {
        this.formObs =  this.employeesSrv.addEmployee(form.value)
      }
      this.subscription.add(this.formObs.subscribe(
        (data) => {
          //MessageUtils.displayNotification(this.dialog, data.message, '80%', '50%');
          if (data) {
            this.dialogRef.close(true);
            console.log(form.value);
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
