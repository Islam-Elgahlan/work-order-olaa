import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private _HttpClient: HttpClient) { }

  addNewDevice(data: any): Observable<any> {
    return this._HttpClient.post('devices/create', data)
  }
  getAllDevices(params: any): Observable<any> {
    return this._HttpClient.get('devices', { params: params });
  }
  getDevice(id: number): Observable<any> {
    return this._HttpClient.get(`profile/get_user_by_id/${id}`);
  }
  onEditDevice(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`profile/update_user_by_id/${id}`, data);
  }
  // // Lookups
  // onGetAccountType(): Observable<any> {
  //   return this._HttpClient.get('work-orders/lookups/titles');
  // }
  onGetDepartment(): Observable<any> {
    return this._HttpClient.get('work-orders/lookups/departments');
  }
}
