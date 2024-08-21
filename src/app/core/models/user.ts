export interface IUser {
    id: string;
    lastName: string;
    firstName: string;
    password: string;
    email: string;
    phone: string;
    status: string;
    countryCode: string;
    externalId: string;
    companyId: string;
    modifiedDate: any;
    lastConnection: any;
    roleName: string;
    companyName: string;
    fullName: string;
}

export interface IAddUser {
    roleName: string | undefined;
    companyId: string;
    lastName: string;
    firstName: string;
    password: string;
    email: string;
    roleId: string;
    phone: string;
    userId?: string;
}
