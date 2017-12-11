import { Injectable } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AnimalService {

    constructor(
        private _http: Http
    ) {

    }

    getAnimals(): Observable<any[]> {
        return this._http.get(environment.baseAddress + '/api/animal/')
            .map((response: Response) => { return response.json() })
            .catch(error =>{ return error });
    }
}