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
            .map((response: Response) => { return response.json() });
    }

    getAnimal(id): Observable<any> {
        return this._http.get(environment.baseAddress + '/api/animal/' + id)
            .map((response: Response) => { return response.json() });
    }

    createAnimal(animal): Observable<any> {
        console.log(animal);
        return this._http.post(environment.baseAddress + '/api/animal/', animal)
            .map((response: Response) => { return response.json() });
    }

    updateAnimal(animal): Observable<any> {
        return this._http.put(environment.baseAddress + '/api/animal/' + animal.id, animal)
            .map((response: Response) => { return response.json() });
    }

    deleteAnimal(id): Observable<any> {
        return this._http.delete(environment.baseAddress + '/api/animal/'+ id)
            .map((response: Response) => { return response.json() });
    }

    uploadImages(id, images): Observable<any> {
        return this._http.post(environment.baseAddress + '/api/animal/images/'+ id, images)
            .map((response: Response) => { return response.json() });
    }

    getImages(id): Observable<any> {
        return this._http.get(environment.baseAddress + '/api/animal/images/' + id)
            .map((response: Response) => { return response.json() });
    }
}