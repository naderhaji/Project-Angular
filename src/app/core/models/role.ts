export interface IRole {
    id: string;
    name: string;
    description: string;
    composite: boolean;
    composites: string;
    clientRole: boolean;
    containerId: string;
    attributes: string;
}
