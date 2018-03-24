import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApplicationService {

    constructor(
        private _http: Http,
        private _router: Router
    ){}

    getApplications(): Observable<any[]> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/application/', options)
            .map((response: Response) => { return response.json() });
    }

    getApplication(id): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/application/' + id, options)
            .map((response: Response) => { return response.json() });
    }

    getApplicationsForUser(id) {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/application/user/' + id, options)
            .map((response: Response) => { return response.json() });
    }

    createApplication(apply): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(environment.baseAddress + '/api/application/', apply, options)
            .map((response: Response) => { return response.json() });
    }

    updateApplication(apply): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.put(environment.baseAddress + '/api/application/', apply, options)
            .map((response: Response) => { return response.json() });
    }

    deleteApplication(id): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.delete(environment.baseAddress + '/api/application/'+ id, options)
            .map((response: Response) => { return response.json() });
    }

    rateApplication(rate): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(environment.baseAddress + '/api/application/rate', rate, options)
            .map((response: Response) => { return response.json() });
    }
}