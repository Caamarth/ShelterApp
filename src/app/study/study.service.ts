import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StudyService {

    constructor(private _http: Http) {

    }

    getStudiesForApplication(id: number) {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/study/application/' + id, options)
            .map((response: Response) => { return response.json() });
    }

    getStudy(id: number) {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(environment.baseAddress + '/api/study/' + id, options)
            .map((response: Response) => { return response.json() });
    }

    updateStudy(study, id) {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' + localStorage.getItem('token'));
        let options = new RequestOptions({
            headers: headers
        });
        return this._http.post(environment.baseAddress + '/api/study/' + id, study, options)
            .map((response: Response) => { return response.json() });
    }
}