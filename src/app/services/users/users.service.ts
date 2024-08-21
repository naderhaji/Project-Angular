import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';
import { IAddUser } from 'src/app/core/models/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public AppParameters;
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        this.AppParameters = this.configService.config;
    }

    CreateUser(user: any) {
        return this.http.post<any>(this.AppParameters.apiUrl + 'api/user', user);
    }

    getUsers(searchCriteria?: string, pageNumber?: number, pageSize?: number) {
        return this.http.get<any>(
            this.AppParameters.apiUrl +
                'api/user?searchCriteria=' +
                searchCriteria +
                '&pageNumber=' +
                pageNumber +
                '&pageSize=' +
                pageSize
        );
    }

    deleteUser(id: string) {
        return this.http.delete(this.AppParameters.apiUrl + 'api/user', { body: { userId: id } });
    }

    changeUserStatus(id: string) {
        return this.http.put<any>(this.AppParameters.apiUrl + 'api/user/status', { userId: id });
    }

    updateUser(user: IAddUser) {
        return this.http.put<any>(this.AppParameters.apiUrl + 'api/user', user);
    }

    /** Get number of user tenant & admin */
    getNumberUserAdminTenant(){
      let url = `${this.AppParameters.apiUrl}api/user/number-by-role`;
      return this.http.get(url)
    }
}
