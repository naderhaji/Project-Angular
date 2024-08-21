import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    public AppParameters;
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.AppParameters = this.configService.config;
    }

    getRoles() {
      return this.http.get<any>(this.AppParameters.apiUrl + 'api/admin/roles');
  }
}
