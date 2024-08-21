import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';
import { ICompany } from 'src/app/core/models/companys';

@Injectable({
    providedIn: 'root'
})
export class CompanysService {
    public AppParameters;
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.AppParameters = this.configService.config;
    }

    /* Add Compagnies */
    addCompany(company : ICompany){
      let url = `${this.AppParameters.apiUrl}api/company`;
        return this.http.post(url, company);
    }

    /** Get All Companys */
    getCompanys(pageNumber?: number, pageSize?: number, searchCriteria?: string) {
        let url = `${this.AppParameters.apiUrl}api/company`;
        if(pageNumber && pageSize){
         url = `${this.AppParameters.apiUrl}api/company?searchCriteria=${searchCriteria}&pageNumber=${pageNumber}&pageSize=${pageSize}`
        }
        return this.http.get<any>(url);
    }

    /* Get Company by Id  */
    getCompanyById(companyId:string){
      let url = `${this.AppParameters.apiUrl}api/company/${companyId}`;
      return this.http.get(url);
    }

    /* Update Company */
    updateCompany(company:ICompany){
      let url = `${this.AppParameters.apiUrl}api/company`;
      return this.http.put(url,company)
    }

    /* Delete Company */
    deleteCompany(companyId:string){
      let url = `${this.AppParameters.apiUrl}api/company`;
      return this.http.delete(url,{body:{ companyId : companyId}})
    }

     /* Delete Company */
     getTotalNumberCompany(){
      let url = `${this.AppParameters.apiUrl}api/company/number`;
      return this.http.get(url)
    }
}
