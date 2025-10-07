import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDevicesComponent } from './components/all-devices/all-devices.component';
import { AddEditDeviceComponent } from './components/add-edit-device/add-edit-device.component';

const routes: Routes = [
  {path:'',component:AllDevicesComponent},
  {path:'devices',component:AllDevicesComponent},
  {path:'add-edit-device',component:AddEditDeviceComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
