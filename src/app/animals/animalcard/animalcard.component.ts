import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'animal-card',
    templateUrl: 'animalcard.component.html',
    styleUrls: ['animalcard.component.css']
})
export class AnimalCardComponent implements OnInit{

    @Input() animal: any

    constructor(private _router: Router) {
        
    }

    ngOnInit() {}

    openAnimal(id) {
        this._router.navigate(['animal', id]);
    }
}