import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandInterface } from '../../../interfaces/VehicleInterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newBrand(brand: BrandInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/brand', brand, {headers: this.headers});
  }

  readBrand(): Observable<any> {
    return this.http.get<any>(environment.API_BASE + '/brand', {headers: this.headers});
  }

  updateBrand(brand: BrandInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/brand', brand, {headers: this.headers});
  }

  deleteBrand(brand: BrandInterface): Observable<any>{
    return this.http.delete<any>(environment.API_BASE + '/brand/' + brand.id, {headers: this.headers});
  }
}
