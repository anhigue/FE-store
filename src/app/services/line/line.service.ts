import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineInterface } from '../../../interfaces/VehicleInterface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newLine(line: LineInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', line, {headers: this.headers});
  }

  readLine(): Observable<any> {
    return this.http.get<any>(environment.API_BASE + '', {headers: this.headers});
  }

  updateLine(line: LineInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '', line, {headers: this.headers});
  }

  deleteLine(line: LineInterface): Observable<any> {
    return this.http.delete<any>(environment.API_BASE + '' + line.id, {headers: this.headers});
  }
}
