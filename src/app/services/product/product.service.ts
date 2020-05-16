import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newProduct(product: ProductInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/product', product, {headers: this.headers});
  }

  readProduct(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(environment.API_BASE + '/product', { headers: this.headers});
  }

  updateProduct(product: ProductInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/product', product, {headers: this.headers});
  }

  deleteProduct(product: ProductInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/product/' + product.id, {headers: this.headers});
  }

  assignVehicleProduct(product: ProductInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/product/vehicle/add', product, {headers: this.headers});
  }

  unAssignVehicleProduct(product: ProductInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/product/vehicle/remove', product, {headers: this.headers});
  }

  updateStockProduct(product: ProductInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/product/stock', product, {headers: this.headers});
  }

  readProductStoreFactory(factory: FactoryInterface): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(environment.API_BASE + '/product/fabric/' + factory.id, {headers: this.headers});
  }
}
