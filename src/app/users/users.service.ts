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
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/user/', options)
            .map((response: Response) => { return response.json() });
    }

    getUser(id): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/user/' + id, options)
            .map((response: Response) =>{ return response.json() });
    }

    createUser(newuser): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(environment.baseAddress + '/api/user/', newuser, options)
            .map((response: Response) => { return response.json() });
    }

    updateUser(updatedUser): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        console.log(updatedUser);
        return this._http.put(environment.baseAddress + '/api/user/' + updatedUser.id, updatedUser, options)
            .map((response: Response) => { return response.json() });
    }

    deleteUser(id): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.delete(environment.baseAddress + '/api/user/' + id, options)
            .map((response: Response) => { return response.json() });
    }
}