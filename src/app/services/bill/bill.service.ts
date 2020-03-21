import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BillInterface } from '../../../interfaces/BillInterface';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newBill(bill: BillInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', bill, {headers: this.headers});
  }

  readBill(): Observable<BillInterface[]> {
    return this.http.get<BillInterface[]>(environment.API_BASE + '', {headers: this.headers});
  }

  updateBill(bill: BillInterface): Observable<any> {
    return this.http.put(environment.API_BASE + '', bill, {headers: this.headers});
  }

  deleteBill(bill: BillInterface): Observable<any> {
    return this.http.delete<any>(environment.API_BASE + '' + bill.id, {headers: this.headers});
  }

}
