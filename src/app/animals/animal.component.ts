import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AnimalService } from './animal.service';
import { AnimalModel } from './animals.model';

@Component({
    templateUrl: 'animal.component.html',
    styleUrls: ['animal.component.css']
})
export class AnimalComponent implements OnInit {

    animal: AnimalModel
    id: number;
    images: string[];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _animalService: AnimalService
    ) {
        let subscription = this._activatedRoute.paramMap
            .switchMap((params: ParamMap) => {
                this.id = +params.get('id');
                if (this.id > 0) {
                    return this._animalService.getAnimal(this.id);
                }
            });

        subscription.subscribe(data => {
            this.animal = data;
            this._animalService.getImages(this.animal.id).subscribe(response => {
                if (response) {
                    this.images = response;
                }
            });
        }, error => { console.log(error) });
    }

    ngOnInit(){}

    applyForAnimal(id) {
        this._router.navigate(['apply','create', id]);
    }

    sexToString(value) {
        if (value === 0) {
            return 'Fiú';
        }
        else {
            return 'Lány';
        }
    }

    classToString(value) {
        if (value === 0) {
            return 'Szelíd';
        }
        if (value === 1) {
            return 'Félős';
        }
        if (value === 2) {
            return 'Harapós';
        } else {
            return 'Lusta';
        }
    }

    returnToMain() {
        this._router.navigate(['']);
    }
}