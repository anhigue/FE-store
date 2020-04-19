import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateInterface } from '../../../interfaces/StateInterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateRequestService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newStateRequest(state: StateInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/request/state', state, {headers: this.headers});
  }

  readStateRequest(): Observable<StateInterface[]> {
    return this.http.get<StateInterface[]>(environment.API_BASE + '/request/state', { headers: this.headers});
  }

  updateStateRequest(state: StateInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/request/state', state, {headers: this.headers});
  }

  deleteStateRequest(state: StateInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/request/state/' + state.id, {headers: this.headers});
  }
}
