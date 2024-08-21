import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/config.service';
import { IService } from 'src/app/core/models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public AppParameters;
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.AppParameters = this.configService.config;
    }

    /** Add Service */
    addService(service : IService) {
      let url = `${this.AppParameters.apiUrl}api/service`;
        return this.http.post(url, service);
    }

    /** Get All Services */
    getAllServices(pageNumber?: number, pageSize?: number, searchCriteria?: string) {
      let url = `${this.AppParameters.apiUrl}api/service?searchCriteria=${searchCriteria}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
      return this.http.get(url);
    }

    /** Update Service */
    updateService(service : IService){
      let url = `${this.AppParameters.apiUrl}api/service`;
      return this.http.put(url, service);
    }

    /** Get All Services */
    getServiceById(serviceId:string){
      let url = `${this.AppParameters.apiUrl}api/Service/${serviceId}`;
      return this.http.get(url);
    }

    /** Delete Service */
    deleteService(serviceId:string){
      let url = `${this.AppParameters.apiUrl}api/service`;
      return this.http.delete(url,{body:{ id : serviceId}})
    }
    /** Set status service */
    setStatus(id:string){
      let url = `${this.AppParameters.apiUrl}api/service/status`;
        return this.http.put(url, {id:id});
    }
    getallServices() {
      let url = `${this.AppParameters.apiUrl}api/service`;
      return this.http.get<any>(url);
    }
}
