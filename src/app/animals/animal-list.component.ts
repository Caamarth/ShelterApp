import { Component } from '@angular/core';
import { AnimalService } from './animal.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent {

    animalList: any[];

    constructor(
        private _animalService: AnimalService,
        private _router: Router
    ) {
        this._animalService.getAnimals().subscribe(resp => {
            this.animalList = resp;
        }, error => console.log(error.status));
    }
 }