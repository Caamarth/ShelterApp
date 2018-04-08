import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../animal.service';

@Component({
    selector: 'animal-card',
    templateUrl: 'animalcard.component.html',
    styleUrls: ['animalcard.component.css']
})
export class AnimalCardComponent implements OnInit{

    @Input() animal: any
    image: string;

    constructor(private _router: Router,
        private _animalService: AnimalService) {
        
    }

    ngOnInit() {
        this._animalService.getImages(this.animal.id).subscribe(response => {
            if (response[0]) {
                this.image = response[0].animalImgs;
            }
        })
    }

    openAnimal(id) {
        this._router.navigate(['animal', id]);
    }
}