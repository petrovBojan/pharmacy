import { Inject, Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Products } from '../../shared/helpers/interfaces/products.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.baseUrl;

  public products = new BehaviorSubject<Products>(null);
  public products$ = this.products.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(Injector) private injector: Injector,
    private jwtHelper: JwtHelperService) { }

    /* addProduct(formData: FormData): Observable<any> {
      const endpoint = `${this.baseUrl}/Product`;
      return this.http.post<any>(endpoint, formData);
    } */
    addProduct(form) {
      const endpoint = `${this.baseUrl}/Product`;
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      const body = { 
        Title: form.title,
        Description: form.description,
        Price: form.price,
        HaveOnStock: form.haveOnStock,
        Quantity: form.quantity,
        Image: form.image,
        Promo: form.promo,
        Percentage: form.percentage,
        ManufacturerID: form.manufacturer,
        ProductTypeID: form.productType,
        ProductGroupID: form.productGroup,
      };
      const options = { headers: headers};
      return this.http.post<any>(endpoint, body, options).pipe(
  
        map((data: any) => {
          return data;
        }),
        catchError((err) => {
          return throwError(err.error);
        })
      );
    }

    editProduct(ProductId, form) {
      const endpoint = `${this.baseUrl}/Product/${ProductId}`;
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      const body = { 
        Title: form.title,
        Description: form.description,
        Price: form.price,
        HaveOnStock: form.haveOnStock,
        Quantity: form.quantity,
        Image: form.image,
        Promo: form.promo,
        Percentage: form.percentage,
        ManufacturerID: form.manufacturer,
        ProductTypeID: form.productType,
        ProductGroupID: form.productGroup,
      };
      const options = { headers: headers};
      return this.http.put<any>(endpoint, body, options).pipe(
  
        map((data: any) => {
          return data;
        }),
        catchError((err) => {
          return throwError(err.error);
        })
      );
    }
  
    getProducts() {
      return this.http.get(`${this.baseUrl}/Product`, {
        
      }).pipe(
        tap((data: any) => {
          this.products.next(data);
        }
      ));
    }
    deleteProduct(ProductId) {
      return this.http.delete(`${this.baseUrl}/Product/${ProductId}`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }).pipe(
        map((data: any) => {
          data;
        }
      ));
    }

  signUp(name) {
    const endpoint = `${this.baseUrl}/auth/signup`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = { body: {
      name
    }};
    const options = { headers: headers};
    return this.http.post<any>(endpoint, body, options).pipe(

      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        return throwError(err.error);
      })
    );
  }

  
//////////////ProductGroup/////////////////
addProductGroup(name) {
  const endpoint = `${this.baseUrl}/ProductGroup`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const body = { 
    GroupName: name,
  };
  const options = { headers: headers};
  return this.http.post<any>(endpoint, body, options).pipe(

    map((data: any) => {
      return data;
    }),
    catchError((err) => {
      return throwError(err.error);
    })
  );
}

  getProductGroups() {
    return this.http.get(`${this.baseUrl}/ProductGroup`, {
      
    }).pipe(
      tap((data: any) => {
        data;
      }
    ));
  }
  deleteProductGroup(ProductGroupId) {
    return this.http.delete(`${this.baseUrl}/ProductGroup/${ProductGroupId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((data: any) => {
        data;
      }
    ));
  }
  /////////////ProductType//////////////////
addProductType(name) {
  const endpoint = `${this.baseUrl}/ProductType`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const body = { 
    Name: name,
  };
  const options = { headers: headers};
  return this.http.post<any>(endpoint, body, options).pipe(

    map((data: any) => {
      return data;
    }),
    catchError((err) => {
      return throwError(err.error);
    })
  );
}

getProductTypes() {
  return this.http.get(`${this.baseUrl}/ProductType`, {
    
  }).pipe(
    tap((data: any) => {
      data;
    }
  ));
}
  deleteProductType(ProductTypeId) {
    return this.http.delete(`${this.baseUrl}/ProductType/${ProductTypeId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((data: any) => {
        data;
      }
    ));
  }
//////////Manufacturer///////////
  addManufacturer(name) {
    const endpoint = `${this.baseUrl}/Manufacturer`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = { 
      Name: name,
    };
    const options = { headers: headers};
    return this.http.post<any>(endpoint, body, options).pipe(

      map((data: any) => {
        return data;
      }),
      catchError((err) => {
        return throwError(err.error);
      })
    );
  }
  getManufacturers() {
    return this.http.get(`${this.baseUrl}/Manufacturer`, {
      
    }).pipe(
      tap((data: any) => {
        data;
      }
    ));
  }
  deleteManufacturer(manufacturerId) {
    return this.http.delete(`${this.baseUrl}/Manufacturer/${manufacturerId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((data: any) => {
        data;
      }
    ));
  }

 //////////Shops///////////
 addShop(form) {
  const endpoint = `${this.baseUrl}/Shops`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const body = { 
    Name: form.name,
    Status: 1,
    address: form.address,
    contact: form.contact
  };
  const options = { headers: headers};
  return this.http.post<any>(endpoint, body, options).pipe(

    map((data: any) => {
      return data;
    }),
    catchError((err) => {
      return throwError(err.error);
    })
  );
}

editShop(shopId, form) {
  const endpoint = `${this.baseUrl}/Shops/${shopId}`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const body = { 
    Name: form.name,
    Status: 1,
    address: form.address,
    contact: form.contact
  };
  const options = { headers: headers};
  return this.http.put<any>(endpoint, body, options).pipe(

    map((data: any) => {
      return data;
    }),
    catchError((err) => {
      return throwError(err.error);
    })
  );
}

  getShops() {
    return this.http.get(`${this.baseUrl}/Shops`, {
      
    }).pipe(
      tap((data: any) => {
        data;
      }
    ));
  }

  deleteShop(shopsId) {
    return this.http.delete(`${this.baseUrl}/Shops/${shopsId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((data: any) => {
        data;
      }
    ));
  }
}