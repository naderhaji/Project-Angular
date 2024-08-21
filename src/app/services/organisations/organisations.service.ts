import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';

@Injectable({
    providedIn: 'root'
})
export class OrganisationsService {
    public AppParameters;
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.AppParameters = this.configService.config;
    }

    CreateOrganisation(company: any) {
        return this.http.post<any>(this.AppParameters.apiUrl + 'api/Admin/CreateCompany', company);
    }
    getOrganisations() {
        return this.http.get<any>(this.AppParameters.apiUrl + 'api/Admin/ListCompanies');
    }
}
