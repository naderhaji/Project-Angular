import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ibrands } from 'src/app/core/models/brands';
import { Idevicestypes } from 'src/app/core/models/devicestypes';
import { Iiotdevices } from 'src/app/core/models/iotdevices';
import { Isensors } from 'src/app/core/models/sensors';
import { IotDevicesService } from 'src/app/services/IOT-devices/iot-devices.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
    selector: 'app-add-update-iot-devices',
    templateUrl: './add-update-iot-devices.component.html',
    styleUrls: ['./add-update-iot-devices.component.scss']
})
export class AddUpdateIOTDevicesComponent implements OnInit {
    isEditMode: boolean;
    IOTdeviceData: any = {};
    submitted = false;
    IOTdeviceForm!: FormGroup
    constructor(
        public dialogRef: MatDialogRef<AddUpdateIOTDevicesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private iotdevicesServ: IotDevicesService,private toastServ: ToasterService
    ) {
        if (data && data.isEdit) {
            this.isEditMode = true;
            this.IOTdeviceData = data.iotdevices || {};
          }
    }
    ngOnInit(): void {
        this.InitiateFormIotdevices();
        this.getAllIotDevicesType()
        this.getAllIotDevicesBrands()
        this.getAllIotDevicesSensors()
    }
    InitiateFormIotdevices() {
        this.IOTdeviceForm = new FormGroup({
            serialNumber: new FormControl(this.data?.iotdevices ? this.data.iotdevices.serialNumber : '', [Validators.required]),
            IotDeviceTypeId: new FormControl(this.data?.iotdevices ? this.data.iotdevices.idTypeIotDevice:'', [Validators.required]),
            sensors: new FormControl(this.data?.iotdevices ? this.data.iotdevices.idSensors : [], [Validators.required]),
            IotDeviceBrandId: new FormControl(this.data?.iotdevices ? this.data.iotdevices.iotDeviceBrand.id : '', [Validators.required])
        });
    }


    getAllIotDevicesType() {
        this.iotdevicesServ.getAllIotDeviceTypes().then((IOTdevicetypesdata: any) => {
            this.devices = IOTdevicetypesdata.result;
        });
    }
    getAllIotDevicesBrands() {
        this.iotdevicesServ.getAllIotDeviceBrands().then((IOTdevicebrandsdata: any) => {
            this.brands = IOTdevicebrandsdata.result;
        }
        );
    }
    getAllIotDevicesSensors() {
        this.iotdevicesServ.getAllIotDeviceSensors().then((IOTdevicesensorsdata: any) => {
            this.sensors = IOTdevicesensorsdata.result;
        }
        );
    }
    devices: Idevicestypes[] = [];
    sensors: Isensors[] = [];
    brands: Ibrands[] = [];

    
    
    createIOTdevice() {
        this.iotdevicesServ.addIotDevice(this.IOTdeviceForm.value).then((data) => {
            this.toastServ.successToast('Iot Devices is successfully created');
            this.dialogRef.close();
            console.log(data);
        },
            
        (error) => this.toastServ.errorToast(error.error[0].errorMessage))
    }

    updateIOTdevice() {
        this.iotdevicesServ.updateIotDevice(this.data.iotdevices.id, this.IOTdeviceForm.value).then(
            (id) => {
                this.toastServ.successToast('Iot Devices is successfully updated');
                this.dialogRef.close();
            },
            (error) => this.toastServ.errorToast(error.error[0].errorMessage)
        );
    }

    actionToCall() {
        this.submitted = true;
        console.log('this.IOTdeviceForm',this.IOTdeviceForm.value)
        Object.keys(this.IOTdeviceForm.controls).forEach(key => {
            this.IOTdeviceForm.get(key)?.markAsTouched();
        });
        if (this.IOTdeviceForm.invalid) {
            return;
          }
        if (this.data?.iotdevices) {
            this.updateIOTdevice();  
        }else {
            this.createIOTdevice(); 
        }
    }

}