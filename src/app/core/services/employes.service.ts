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
 export class EmployeesService {
   baseUrl = environment.baseUrl;
 
   public employees = new BehaviorSubject<Products>(null);
   public employees$ = this.employees.asObservable();
 
   constructor(
     private http: HttpClient,
     @Inject(Injector) private injector: Injector,
     private jwtHelper: JwtHelperService) { }
 
 //////////Emploees///////////
 addEmployee(form) {
  const endpoint = `${this.baseUrl}/Users`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const body = { 
    FirstName: form.firstName,
    LastName: form.lastName,
    Password: "123456",
    Email: form.email,
    Image: form.image,
    JobTitle: form.jobTitle,
    Contact: form.contact,
    Education: form.education,
    workYearsNum: form.numberOfWorkYears,
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

editEmployee(employeeId, form) {
  const endpoint = `${this.baseUrl}/Users/${employeeId}`;
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const body = { 
    FirstName: form.firstName,
    LastName: form.lastName,
    Password: "123456",
    Email: form.email,
    Image: form.image,
    JobTitle: form.jobTitle,
    Contact: form.contact,
    Education: form.education,
    workYearsNum: form.numberOfWorkYears,
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

  getEmployees() {
    return this.http.get(`${this.baseUrl}/Users`, {
      
    }).pipe(
      tap((data: any) => {
        data;
      }
    ));
  }

  deleteEmployee(employeeId) {
    return this.http.delete(`${this.baseUrl}/Users/${employeeId}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map((data: any) => {
        data;
      }
    ));
  }
}