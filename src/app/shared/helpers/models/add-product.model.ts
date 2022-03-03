import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';


export class ProductModel {

  static mapFormGroupToFormData(formGroup: FormGroup): FormData {
    if (!formGroup)
        return null;

    let name = formGroup.get('title')?.value;
    let description = formGroup.get('description')?.value;
    let manufacturer = formGroup.get('manufacturer')?.value;
    let productGroup = formGroup.get('productGroup')?.value;
    let productType = formGroup.get('productType')?.value;
    let price = formGroup.get('price')?.value;
    let quantity = formGroup.get('quantity')?.value;
    let haveOnStock = formGroup.get('haveOnStock')?.value;
    let ourShops = formGroup.get('ourShops')?.value;
    let promo = formGroup.get('promo')?.value;
    let percentage = formGroup.get('percentage')?.value;

    name = (!name) ? '' : name;    

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('manufacturer', manufacturer);
    formData.append('productGroup', productGroup);
    formData.append('productType', productType);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('haveOnStock', haveOnStock);
    formData.append('ourShops', ourShops);
    formData.append('promo', promo);
    formData.append('percentage', percentage);

    return formData;
  }

  static appendIndependentPropsToFormData(formData: FormData,  logo: File): void {
    if (logo) {
        formData.append('logo', logo, logo.name);
    } 
  }
}