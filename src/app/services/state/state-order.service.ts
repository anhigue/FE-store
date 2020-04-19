import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StateInterface } from '../../../interfaces/StateInterface';

@Injectable({
  providedIn: 'root'
})
export class StateOrderService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newStateOrder(state: StateInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/order/state', state, {headers: this.headers});
  }

  readStateOrder(): Observable<StateInterface[]> {
    return this.http.get<StateInterface[]>(environment.API_BASE + '/order/state', { headers: this.headers});
  }

  updateStateOrder(state: StateInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/order/state', state, {headers: this.headers});
  }

  deleteStateOrder(state: StateInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/order/state/' + state.id, {headers: this.headers});
  }
}
