import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/config.service';
import { Ipackage } from 'src/app/core/models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  public AppParameters;

  constructor(private http: HttpClient,
    private configService: ConfigService) {
      this.AppParameters = this.configService.config;
     }

     /* Add Package */
  addPackage(pack: Ipackage) {
    let url = `${this.AppParameters.apiUrl}api/Package`;
    return this.http.post(url, pack);
  }

  /* Get All Packages */
  getAllPackages(pageNumber: number, pageSize: number, searchCriteria = '') {
    let url = `${this.AppParameters.apiUrl}api/Package?pageNumber=${pageNumber}&pageSize=${pageSize}&searchCriteria=${searchCriteria}`;
    return this.http.get(url);
  }

  /* Get Package By Id */
  getPackageById(packageId: string) {
    let url = `${this.AppParameters.apiUrl}api/Package/${packageId}`;
    return this.http.get(url);
  }

  /* delete Package */
  deletePackage(packageId: string) {
    let url = `${this.AppParameters.apiUrl}api/Package`;
    return this.http.delete(url,{body:{ id : packageId}});
  }

  /* update Package */
  updatePackage(pack: Ipackage) {
    let url = `${this.AppParameters.apiUrl}api/Package`;
    return this.http.put(url, pack);
  }

  /* setStatus Package */
  setStatus(id:string){
    let url = `${this.AppParameters.apiUrl}api/Package/status`;
    return this.http.put(url, { id:id });
  }
}
