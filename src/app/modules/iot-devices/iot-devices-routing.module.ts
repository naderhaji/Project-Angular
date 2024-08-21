import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IotDevicesComponent } from './iot-devices/iot-devices.component';

const routes: Routes = [
  {
    path:'',
    component:IotDevicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotDevicesRoutingModule { }
