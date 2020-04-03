import { SubInterface } from './../../../interfaces/SubInterface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubsService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newSub(sub: SubInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/subscription', sub, {headers: this.headers});
  }

  readSub(): Observable<SubInterface[]> {
    return this.http.get<SubInterface[]>(environment.API_BASE + '/subscription', { headers: this.headers});
  }

  updateSub(sub: SubInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/subscription', sub, {headers: this.headers});
  }

  deleteSub(sub: SubInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/subscription/' + sub.id, {headers: this.headers});
  }

}
