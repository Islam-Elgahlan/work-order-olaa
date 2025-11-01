import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private _HttpClient: HttpClient) { }

  addNewDevice(data: any): Observable<any> {
    return this._HttpClient.post('devices/create', data);
  }
  getAllDevices(params: any): Observable<any> {
    return this._HttpClient.get('devices', { params: params });
  }
  getDevice(id: number): Observable<any> {
    return this._HttpClient.get(`devices/show/${id}`);
  }
  onEditDevice(data: any, id: number): Observable<any> {
    return this._HttpClient.put(`devices/update/${id}`, data);
  }
  getDeviceWorkOrder(id: number): Observable<any> {
    return this._HttpClient.get(`work-orders/orders_by_device/${id}`);
  }

  // // Lookups
  // onGetAccountType(): Observable<any> {
  //   return this._HttpClient.get('work-orders/lookups/titles');
  // }
  onGetDepartment(): Observable<any> {
    return this._HttpClient.get('departments');
  }
  onGetDeviceModel(): Observable<any> {
    return this._HttpClient.get('device_models');
  }
  onGetDeviceManufacturers(): Observable<any> {
    return this._HttpClient.get('device_manufacturers');
  }
  onGetDeviceType(): Observable<any> {
    return this._HttpClient.get('device_types');
  }
  onGetCustodians(): Observable<any> {
    return this._HttpClient.get('auth/get_custodians/10');
  }
  onGetDeviceStatus(): Observable<any> {
    return this._HttpClient.get('device_statuses');
  }
}
