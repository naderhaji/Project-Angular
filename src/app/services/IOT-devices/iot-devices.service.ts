import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';
import { Iiotdevices } from 'src/app/core/models/iotdevices';

@Injectable({
    providedIn: 'root'
})
export class IotDevicesService {
    public AppParameters;

    constructor(private http: HttpClient,
        private configService: ConfigService) { this.AppParameters = this.configService.config; }

    /* Get All IOT Devices */

    getAllIotDevices(pageNumber?: number, pageSize?: number, searchCriteria?: string) {
        let url = `${this.AppParameters.apiUrl}api/iot-device/all?searchCriteria=${searchCriteria}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.http.get(url).toPromise();
    }


    /* Get All IOT Device Types */

    getAllIotDeviceTypes() {
        let url = `${this.AppParameters.apiUrl}api/iot-device-type`;
        return this.http.get(url).toPromise();
    }

    /* Get All IOT Device brands */

    getAllIotDeviceBrands() {
        let url = `${this.AppParameters.apiUrl}api/iot-device-brand`;
        return this.http.get(url).toPromise();
    }

    /* Get All IOT Device Sensors */

    getAllIotDeviceSensors() {
        let url = `${this.AppParameters.apiUrl}api/sensor`;
        return this.http.get(url).toPromise();
    }

    /* Add IOT Device */

    addIotDevice(iotDevice: any) {
        let url = `${this.AppParameters.apiUrl}api/iot-device`;
        return this.http.post(url, iotDevice).toPromise();
    }

    /* Delete IOT Device */

    deleteIotDevice(iotDeviceId: string) {
        let url = `${this.AppParameters.apiUrl}api/iot-device`;
        return this.http.delete(url,{body:{ id : iotDeviceId}}).toPromise();
    }

    /* Update IOT Device */

    updateIotDevice(iotDeviceId: string, iotDevice: Iiotdevices) {
        let url = `${this.AppParameters.apiUrl}api/iot-device`;
        let body = { id: iotDeviceId, ...iotDevice };
        return this.http.put(url, body).toPromise();
    }

    /* Set Satuts Iot devices */
    setStatus(id:string){
        let url = `${this.AppParameters.apiUrl}api/iot-device/status`;
          return this.http.put(url, {id:id});
      }
}