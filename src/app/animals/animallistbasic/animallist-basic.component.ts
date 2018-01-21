import { Component } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { AnimalService } from '../animal.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'animallist-basic.component.html',
    styleUrls: ['animallist-basic.component.css']
})
export class AnimalListBasicComponent {

    animallist;

    constructor (
        private _authService: AuthService,
        private _animalService: AnimalService,
        private _router: Router
    ) {
        this.getAnimals();
    }

    getAnimals() {
        this._animalService.getAnimals().subscribe(data => {
            this.animallist = data;
        }, error => { console.log(error)} );
    }

    determineSex(data) {
        return data === 0 ? 'fiú' : 'lány'
    }

    openAnimal(id) {
        this._router.navigate(['animal', id]);
    }

    deleteAnimal(id) {
        this._animalService.deleteAnimal(id).subscribe(resp => {
            if (resp) {
                this.getAnimals();
            }
        }, error => { console.log(error)} );
    }
}