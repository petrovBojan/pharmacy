import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../core/services/products.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectable = false;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  manuCtrl = new FormControl();
  manufacturers: any = [];
  @ViewChild('manuInput', { static: false }) manuInput: ElementRef;

  selectableGroup = false;
  removableGroup = true;
  groupCtrl = new FormControl();
  productGroup: any = [];
  @ViewChild('groupInput', { static: false }) groupInput: ElementRef;

  selectableType = false;
  removableType = true;
  typeCtrl = new FormControl();
  productType: any = [];
  @ViewChild('typeInput', { static: false }) typeInput: ElementRef;
  
  constructor(private productSrv: ProductsService,) { }

  ngOnInit(): void {
    this.getManufacturers();
    this.getProductGroup();
    this.getProductType();
  }

  getManufacturers() {
    this.productSrv.getManufacturers().subscribe(
      (data: any) => {
        this.manufacturers = data;
      })
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.productSrv.addManufacturer(value).subscribe(
      (data:any) => {
        data;
        if (input) {
          input.value = '';
        }
        this.manuCtrl.setValue(null);
        this.getManufacturers();
      }
    )
    
  }
  remove(topic): void {
    const index = this.manufacturers.indexOf(topic);
      this.manufacturers.splice(index, 1);
      this.productSrv.deleteManufacturer(topic.ManufacturerID).subscribe(
        (data: any) => {
          this.getManufacturers();
        }
      )
  }

/////Product group
  getProductGroup() {
    this.productSrv.getProductGroups().subscribe(
      (data: any) => {
        this.productGroup = data;
      })
  }
  addGroup(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.productSrv.addProductGroup(value).subscribe(
      (data:any) => {
        data;
        if (input) {
          input.value = '';
        }
        this.manuCtrl.setValue(null);
        this.getProductGroup();
      }
    )
    
  }
  removeGroup(group): void {
    const index = this.productGroup.indexOf(group);
      this.productGroup.splice(index, 1);
      this.productSrv.deleteProductGroup(group.ProductGroupID).subscribe(
        (data: any) => {
          this.getProductGroup();
        }
      )
  }

  /////Product group
  getProductType() {
    this.productSrv.getProductTypes().subscribe(
      (data: any) => {
        this.productType = data;
      })
  }
  addType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    this.productSrv.addProductType(value).subscribe(
      (data:any) => {
        data;
        if (input) {
          input.value = '';
        }
        this.manuCtrl.setValue(null);
        this.getProductType();
      }
    )
    
  }
  removeType(type): void {
    const index = this.productType.indexOf(type);
      this.productType.splice(index, 1);
      this.productSrv.deleteProductType(type.ProductTypeID).subscribe(
        (data: any) => {
          this.getProductType();
        }
      )
  }
}
