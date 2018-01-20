import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserModel } from '../users/users.model';

@Injectable()
export class AuthService {

    loggedInUser: UserModel;

    constructor(
        private _http: Http
    ) {
        this.loggedInUser = null;
    }

    login(model: LoginModel): Observable<any> {
        return this._http.post(environment.baseAddress + '/api/login/', model)
            .map(response => {
                return response.json();
            }, error => {
                return error;
            })
    }

    setLoggedInUser(user: any) {
        this.loggedInUser = user;
    }

    userIsAuthenticated() {
        return this.loggedInUser ? true : false;
    }

    getUserName() {
        return sessionStorage.getItem('userName');
    }

    logout() {
        this.loggedInUser = null;
        sessionStorage.removeItem('token');
    }
}