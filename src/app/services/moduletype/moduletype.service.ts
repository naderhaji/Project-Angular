import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class ModuletypeService {
  public AppParameters;
  constructor(
      private http: HttpClient,
      private configService: ConfigService
  ) {
      this.AppParameters = this.configService.config;
  }

  /** Get all module type */

  getAllModuleType() {
    let url = `${this.AppParameters.apiUrl}api/module-type`;
    return this.http.get<any>(url);
  }

}
