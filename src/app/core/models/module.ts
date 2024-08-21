export interface Imodule{
    id?: string,
    name: string,
    code: string,
    description: string,
    features: string[],
    moduleTypeId: string,
    isEnabled?:boolean   
}
