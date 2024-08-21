export interface IService {
    id?:string;
    categoryId: string;
    name: string;
    code: string;
    quantity: number;
    description: string;
    servicePricings: IPrice;
}

export interface IPrice {
    id?:string;
    countriesCodes:string[];
    currencyCode:string;
    pricePerMonth:number;
    sectors:any[]
}
