import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
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
        return localStorage.getItem('userName') ? true : false;
    }

    getUserName() {
        return localStorage.getItem('userName');
    }

    getId() {
        if (this.loggedInUser) {
            return this.loggedInUser.id;
        }
    }

    logout() {
        this.loggedInUser = null;
        localStorage.clear();
        
    }

    registerUser(register: LoginModel) {
        return this._http.post(environment.baseAddress + '/api/user/register', register)
            .map((response: Response) => { return response.json() });
    }

    isAdminUser() {
        if(this.userIsAuthenticated()) {
            return localStorage.getItem('role') === 'Admin' ? true : false;
        }
        return false;
    }
}