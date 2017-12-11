import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService {

    constructor(
        private _router: Router,
        private _http: Http
    ) { }

    getUsers(): Observable<any[]> {
        return this._http.get(environment.baseAddress + '/api/user/')
            .map((response: Response) => { return response.json() })
            .catch(error => { return error });
    }
}