import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public AppParameters;
  constructor(
      private http: HttpClient,
      private configService: ConfigService
  ) {
      this.AppParameters = this.configService.config;
  }

  /** Get All Category */
  getAllCategory() {
      let url = `${this.AppParameters.apiUrl}api/category`;
      return this.http.get<any>(url);
  }
}
