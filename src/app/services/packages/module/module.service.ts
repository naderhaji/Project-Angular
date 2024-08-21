import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/config.service';
import { HttpClient } from '@angular/common/http';
import { Imodule } from 'src/app/core/models/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  public AppParameters;

  constructor(private http: HttpClient,
    private configService: ConfigService) {
    this.AppParameters = this.configService.config;
  }
  /* Add Module */
  addModule(module: Imodule) {
    let url = `${this.AppParameters.apiUrl}api/module`;
    return this.http.post(url, module);
  }

  /* Get All Module */
  getAllModules(pageNumber?: number, pageSize?: number, searchCriteria?: string) {
    let url = `${this.AppParameters.apiUrl}api/module?searchCriteria=${searchCriteria}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  /* Update Module */
  updateModule(module: Imodule) {
    let url = `${this.AppParameters.apiUrl}api/module`;
    return this.http.put(url, module);
  }

  /* delete Module */
  deleteModule(moduleId: string) {
    let url = `${this.AppParameters.apiUrl}api/module`;
    return this.http.delete(url,{body:{ id : moduleId}});
  }

  /* Set Satuts Module */
  setStatus(id:string){
    let url = `${this.AppParameters.apiUrl}api/module/status`;
      return this.http.put(url, {id:id});
  }

  /* Get Module By Id */
  getModuleById(moduleId:string){
    let url = `${this.AppParameters.apiUrl}api/module/${moduleId}`;
    return this.http.get(url);
  }

  getallModules() {
    let url = `${this.AppParameters.apiUrl}api/module`;
    return this.http.get<any>(url);
  }



}
