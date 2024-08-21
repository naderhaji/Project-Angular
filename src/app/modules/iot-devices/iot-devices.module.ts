import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IotDevicesRoutingModule } from './iot-devices-routing.module';
import { IotDevicesComponent } from './iot-devices/iot-devices.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddUpdateIOTDevicesComponent } from './add-update-iot-devices/add-update-iot-devices.component';


@NgModule({
  declarations: [
    IotDevicesComponent,AddUpdateIOTDevicesComponent
  ],
  imports: [
    CommonModule,
    IotDevicesRoutingModule,
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class IotDevicesModule { }
