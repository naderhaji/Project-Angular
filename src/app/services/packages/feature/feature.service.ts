import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../configuration/config.service';
import { IFeature } from 'src/app/core/models/feature';

@Injectable({
    providedIn: 'root'
})
export class FeatureService {
    public AppParameters;
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.AppParameters = this.configService.config;
    }

    /*Add Feature*/
    addFeature(feature: IFeature) {
        let url = `${this.AppParameters.apiUrl}api/feature`;
        return this.http.post(url, feature);
    }

    /* Get All Feature */
    getAllFeatures(pageNumber?: number, pageSize?: number, searchCriteria?: string) {
        let url = `${this.AppParameters.apiUrl}api/feature?searchCriteria=${searchCriteria}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.http.get(url);
    }

    /* Update Feature */
    updateFeature(featureId: string, feature: IFeature) {
        let url = `${this.AppParameters.apiUrl}api/feature`;
        let body = { featureId: featureId, ...feature };
        return this.http.put(url, body);
    }

    /* Delete Feature */
    deleteFeature(featureId:string){
      let url = `${this.AppParameters.apiUrl}api/feature`;
      return this.http.delete(url,{body:{ id : featureId}})
    }

    /* Set Satuts feature */
    setStatus(id:string){
      let url = `${this.AppParameters.apiUrl}api/feature/status`;
        return this.http.put(url, {id:id});
    }

    getallFeatures() {
        let url = `${this.AppParameters.apiUrl}api/feature`;
        return this.http.get<any>(url);
      }

   
}
