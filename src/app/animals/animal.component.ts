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
            console.log(data);
        }, error => { console.log(error) });
    }

    ngOnInit(){}

    applyForAnimal(id) {
        this._router.navigate(['apply','create', id]);
    }

    returnToMain() {
        this._router.navigate(['']);
    }
}