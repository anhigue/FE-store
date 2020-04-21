import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  SaleInterface,
  SaleProductInterface,
  OrderInterface,
} from '../../../interfaces/SaleInterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreditSaleInterface } from '../../../interfaces/SaleInterface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient'
    );
  }

  newSale(sale: SaleInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/sale', sale, {
      headers: this.headers,
    });
  }

  newOrder(order: OrderInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/request', order, {
      headers: this.headers,
    });
  }

  readSale(): Observable<SaleInterface[]> {
    return this.http.get<SaleInterface[]>(environment.API_BASE + '/sale', {
      headers: this.headers,
    });
  }

  updateSale(sale: SaleInterface): Observable<any> {
    return this.http.put(environment.API_BASE + '/request', sale, {
      headers: this.headers,
    });
  }

  deleteSale(sale: SaleInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '' + sale.id, {
      headers: this.headers,
    });
  }

  assignProductSale(product: SaleProductInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', product, {
      headers: this.headers,
    });
  }

  assignProductOrder(productOrder: SaleProductInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', productOrder, {
      headers: this.headers,
    });
  }

  readOrder(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(environment.API_BASE + '/request', {
      headers: this.headers,
    });
  }

  updateStateOrder(order: OrderInterface, state: number): Observable<any> {
    return this.http.put<any>(
      environment.API_BASE + '',
      { order, state },
      { headers: this.headers }
    );
  }

  receibeRequest(order: OrderInterface, state: number): Observable<any> {
    return this.http.put<any>(
      environment.API_BASE + '/request/receive/' + order.id,
      { order, state },
      { headers: this.headers }
    );
  }

  cancelRequest(order: OrderInterface, state: number): Observable<any> {
    return this.http.put<any>(
      environment.API_BASE + '/request/cancel/' + order.id,
      { order, state },
      { headers: this.headers }
    );
  }

  updateStateSale(sale: SaleInterface, state: number): Observable<any> {
    return this.http.put<any>(
      environment.API_BASE + '',
      { sale, state },
      { headers: this.headers }
    );
  }

  readCreditSales(): Observable<CreditSaleInterface[]> {
    return this.http.get<any[]>(environment.API_BASE + '/sale/credit', { headers: this.headers });
  }

  payCreditSale(creditSale: CreditSaleInterface): Observable<any> {
    return this.http.delete<any>(environment.API_BASE + '/sale/credit/' + creditSale.id, { headers: this.headers });
  }
}
