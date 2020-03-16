import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClientInterface } from '../../../interfaces/ClientInterface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newClient(client: ClientInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '/client', client, {headers: this.headers});
  }

  readClient(): Observable<ClientInterface[]> {
    return this.http.get<ClientInterface[]>(environment.API_BASE + '/client', { headers: this.headers});
  }

  updateClient(client: ClientInterface): Observable<any> {
    return this.http.put<any>(environment.API_BASE + '/client', client, {headers: this.headers});
  }

  deleteClient(client: ClientInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/client/' + client.id, {headers: this.headers});
  }
}
