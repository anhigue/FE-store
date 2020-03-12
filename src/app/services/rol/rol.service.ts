import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RolInterface } from '../../../interfaces/RolInterface';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newRol(rol: RolInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '', rol, {headers: this.headers});
  }

  readRol(): Observable<RolInterface[]> {
    return this.http.get<RolInterface[]>(environment.API_BASE + '', { headers: this.headers});
  }

  updateRol(rol: RolInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '', rol, {headers: this.headers});
  }

  deleteRol(rol: RolInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '' + rol.id, {headers: this.headers});
  }
}
