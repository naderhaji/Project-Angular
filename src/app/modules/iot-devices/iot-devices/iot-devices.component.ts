import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { Icard } from 'src/app/core/models/card';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { AddUpdateIOTDevicesComponent } from '../add-update-iot-devices/add-update-iot-devices.component';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';
import { Iiotdevices } from 'src/app/core/models/iotdevices';
import { IotDevicesService } from 'src/app/services/IOT-devices/iot-devices.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Isensors } from 'src/app/core/models/sensors';

@Component({
    selector: 'app-iot-devices',
    templateUrl: './iot-devices.component.html',
    styleUrls: ['./iot-devices.component.scss']
})
export class IotDevicesComponent {
    showselection: boolean = true;
    listoptionMapped: any = [];
    actionButtons: IButtonAction = {
        isDelete: true,
        isEdit: true,
        isLockKey: true
    };
    listoption = [
        { value: '1', viewValue: 'Tenant 1' },
        { value: '2', viewValue: 'Tenant 2' }
    ];

    // Utilisez map pour transformer votre liste

    headers = {
        serialNumber: 'Serial number',
        iotDeviceType: 'Device',
        assignedto: 'Assigned To',
        sensors: 'Sensors',
        iotDeviceBrand: 'Brand'
    };

    iotdevicesList: Iiotdevices[];
    pageSize = 5;
    pageNumber = 1;
    totalLength: number = 0;
    @Input() afterAddIotdevices = false;
    Cards: Icard[] = [
        {
            description: 'Assigned / Total IOT Devices',
            icon: 'assets/icon/sidebarIcon/device_iotside.svg',
            num_stat: 120
        }
    ];
    constructor(
        public navbar: NavbarService,
        public dialog: MatDialog,
        private iotdevicesServ: IotDevicesService,
        private toastServ: ToasterService
    ) {
        this.setNavbar();
    }
    ngOnInit(): void {
        this.getAllIotDevices(this.pageNumber, this.pageSize , '');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.afterAddIotdevices) {
            this.getAllIotDevices(this.pageNumber, this.pageSize);
        }
    }

    editIOTdevice(data: any): void {
        const dialogRef = this.dialog.open(AddUpdateIOTDevicesComponent, {
            width: '800px',
            data: { title: 'Update Iot-devices', iotdevices: data }
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.getAllIotDevices(this.pageNumber, this.pageSize);
            console.log('Modal fermé avec le résultat:', result);
        });
    }

    getAllIotDevices(pageNumber: number, pageSize: number, searchCriteria = '') {
        this.iotdevicesServ.getAllIotDevices(this.pageNumber, this.pageSize, searchCriteria).then((data: any) => {
            let iotDevice: Iiotdevices;
            this.iotdevicesList = [];
            for (let element of data.result.items) {
                let sensors = '';
                for (let sensor of element.sensors) {
                    sensors = sensors + sensor.name + ', ';
                }
                iotDevice = {
                    id: element.id,
                    serialNumber: element.serialNumber,
                    iotDeviceBrand: element.iotDeviceBrand,
                    iotDeviceType: element.iotDeviceType.name,
                    sensors: sensors,
                    isEnabled: element.isEnabled,
                    idTypeIotDevice: element.iotDeviceType.id,
                    idSensors: element.sensors.map((sensor:Isensors) => sensor.id)
                };
                this.iotdevicesList.push(iotDevice);
            }
            this.totalLength = data.result.totalCount;
        });
    }
    onPageChange(event: any) {
        console.log('event', event)
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex + 1;
        this.getAllIotDevices(event.pageNumber, event.pageSize);
    }

    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'IOT Devices',
            breadcrumbIcon: 'IOT_Devices'
        });
    }

    DeleteIotDevices(IotDevice: Iiotdevices) {
        const dialogRef = this.dialog.open(DeletePopupComponent, {
            width: '50px',
            data: { module: 'delete' + ' ' + ' Serial Number = ' + IotDevice.serialNumber   }
        });
        dialogRef.afterClosed().subscribe((confirm) => {
            if (IotDevice.id && confirm) 
                this.iotdevicesServ.deleteIotDevice(IotDevice.id).then(() => {
                    this.toastServ.successToast('Iot Devices is successfully deleted');
                    this.getAllIotDevices(this.pageNumber, this.pageSize);

                },
                    (error) =>
                        this.toastServ.errorToast(error.error[0].errorMessage)
                );
            });
    }
    
    setStatusIotDevices(IotDevice: Iiotdevices) {
        const dialogRef = this.dialog.open(DeletePopupComponent, {
            width: '50px',
            data: { module: 'set status' + ' ' + IotDevice.serialNumber + ' ' + 'IotDevice' }
        });
        dialogRef.afterClosed().subscribe((confirm) => {
            if (IotDevice.id && confirm)
                this.iotdevicesServ.setStatus(IotDevice.id).subscribe(() => {
                    this.toastServ.successToast('Iot Devices status is successfully changed');
                    this.getAllIotDevices(this.pageNumber, this.pageSize);
                },
                    (error) =>
                        this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }


    searchIotdevices(termSearch: string) {
        console.log('termSearch', termSearch)
        this.getAllIotDevices(this.pageNumber, this.pageSize, termSearch);
    }

    addIOT_devices(): void {
        const dialogRef = this.dialog.open(AddUpdateIOTDevicesComponent, {
            width: '800px',
            data: { title: 'Add Iot-devices' }
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.getAllIotDevices(this.pageNumber, this.pageSize);
            console.log('Modal fermé avec le résultat:', result);
        });
    }
}
