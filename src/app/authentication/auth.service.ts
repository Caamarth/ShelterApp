import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    constructor(
        private _http: Http
    ) {

    }

    login(model: LoginModel) {
        
        this._http.post(environment.baseAddress + '/api/login/', model)
            .map(response => {
                localStorage.setItem('token', response.toString());
            }, error => {
                return error;
            })
    }
}