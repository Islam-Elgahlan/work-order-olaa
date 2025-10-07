import { Component } from '@angular/core';
import { DevicesService } from '../../services/devices.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent {
  ngOnInit() {
    this.getDeviceById(this.deviceId)
    this.getDepartment()

  }
  constructor(
    private _activateRoute: ActivatedRoute,
    private _DevicesService: DevicesService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService
  ) {
    this.deviceId = this._activateRoute.snapshot.paramMap.get('id')
    if (this.deviceId) {
      this.isUpdatePage = true;

    } else {
      this.isUpdatePage = false;
    }
  }
  isUpdatePage: boolean = false;

  data: any

  deviceId: any;
  currentDevice: any
  report: any
  departments: any
  departmentId: any
  supervisor: any
  engineers: any
  technicians: any
  start_date: any
  date: any

  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;

  deviceForm = new FormGroup(
    {
      name_ar: new FormControl(null, [Validators.required]),
      name_en: new FormControl(null, [Validators.required]),
      department_id: new FormControl(null, [Validators.required]),
      company_name: new FormControl(null, [Validators.required]),
      serial_number: new FormControl(null, [Validators.required]),
      model_code: new FormControl(null, [Validators.required]),
      buy_date: new FormControl(null, [Validators.required]),
      warranty_period: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),

    }
  );

  onSubmit(data: FormGroup) {
    if (this.deviceId) {
      // Edit Order
      let myData = new FormData();
      let myMap = new Map(Object.entries(data.value));
      for (const [key, value] of myMap) {
        myData.append(key, data.value[key]);
      }

      this._DevicesService.onEditDevice(data.value, this.deviceId).subscribe({
        next: (res) => {
          console.log(data.value)
          this._ToastrService.success('Work Order Updated Succesfuly');
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error in Update Order');
        },
        complete: () => {
          this._Router.navigate(['/dashboard/admin/devices']);
        }
      })

    } else {

      // Add new Order
      // this.date = data.value.start_date.toISOString().slice(0, 10) 
      // console.log(data.value.start_date.toISOString().slice(0, 10))
      let myData = new FormData();
      let myMap = new Map(Object.entries(data.value));
      for (const [key, value] of myMap) {
        myData.append(key, data.value[key]);
      }
      myData.append('start_date', data.value.start_date.toISOString().slice(0, 10));


      this._DevicesService.addNewDevice(myData).subscribe({
        next: (res) => {
          this.data = res
          // console.log(res.message)
          this._ToastrService.success('Work Order Added Succesfuly');
        },
        error: (err) => {
          this._ToastrService.error(
            err.message,
            'Error in Add  Work Order'
          );
        },
        complete: () => {
          // this._Router.navigate(['/dashboard/admin/work-orders']);
        }


      })
    }
  }
  getDeviceById(id: number) {
    this._DevicesService.getDevice(id).subscribe(
      (res) => {
        this.currentDevice = res.data
        // console.log(this.currentDevice.work_type.id)

        this.deviceForm.patchValue({
          name_ar: this.currentDevice?.name_ar,
          name_en: this.currentDevice?.name_en,
          department_id: this.currentDevice?.work_type.id,
          company_name: this.currentDevice?.building.id,
          serial_number: this.currentDevice?.floor_no,
          model_code: this.currentDevice?.room_no,
          buy_date: this.currentDevice?.customer_name,
          warranty_period: this.currentDevice?.customer_phone,
          status: this.currentDevice?.equipment.id,

          // source_id: this.currentDevice?.source.id,
          // description: this.currentDevice?.description,

        })

      }
    )
  }
  getDepartment() {
    this._LookupsService.getDepartment().subscribe(
      (res) => {
        this.departments = res.data
     
      }
    )
  }
}
