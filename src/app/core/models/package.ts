export interface Ipackage{
    id?: string,
    name: string,
    code: string,
    description: string,
    licenceNumber: number,
    validFrom: Date,
    validUntil: Date,
    validity: string,
    modules: string[],
    services: string[],
    isEnabled?:boolean
}