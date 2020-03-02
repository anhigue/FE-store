import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient');
  }

  newVehicle(vehicle: VehicleInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '', vehicle, {headers: this.headers});
  }

  readVehicle(): Observable<VehicleInterface[]> {
    return this.http.get<VehicleInterface[]>(environment.API_BASE + '', { headers: this.headers});
  }

  updateVehicle(vehicle: VehicleInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '', vehicle, {headers: this.headers});
  }

  deleteVehicle(vehicle: VehicleInterface): Observable<any> {
    return this.http.post(environment.API_BASE + '', vehicle, {headers: this.headers});
  }

}
