export interface Iiotdevices {
    id?: string;
    serialNumber: string;
    iotDeviceBrand: string;
    iotDeviceType: string;
    sensors: string;
    isEnabled: boolean;
    idTypeIotDevice?:string;
    idSensors?:string[]}