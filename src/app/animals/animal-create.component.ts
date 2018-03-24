import { Component } from '@angular/core';
import { AnimalModel } from './animals.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalService } from './animal.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'animal-create.component.html',
    styleUrls: ['animal-create.component.css']
})
export class AnimalCreateComponent {

    animal: AnimalModel;
    animalForm: FormGroup;
    invalidForm = false;

    constructor( 
        private _animalService: AnimalService,
        private _router: Router,
        private _fb: FormBuilder) {
       
            this.animalForm = this._fb.group({
                name: ['', Validators.required],
                sex: ['', Validators.required],
                race: ['', Validators.required],
                raceType: ['', Validators.required],
                birthDate: ['', Validators.required],
                admissionDate: ['', Validators.required],
                weight: ['', Validators.required],
                width: ['', Validators.required],
                height: ['', Validators.required],
                length: ['', Validators.required],
                description: ['', Validators.required],
                classification: ['', Validators.required]
            });
    }

    createAnimal() {
        if (!this.animalForm.valid) {
            this.invalidForm = true;
            return;
        }
        let newAnimal = {
             name: this.animalForm.value.name,
             sex: this.animalForm.value.sex,
             race: this.animalForm.value.race,
             raceType: this.animalForm.value.raceType,
             birthDate: this.animalForm.value.birthDate,
             admissionDate: this.animalForm.value.admissionDate,
             weight: this.animalForm.value.weight,
             width: this.animalForm.value.width,
             height: this.animalForm.value.height,
             length: this.animalForm.value.length,
             description: this.animalForm.value.description,
             classification: this.animalForm.value.classification
 
        }
        this._animalService.createAnimal(newAnimal)
         .subscribe(resp => {
             if (resp) {
                 this._router.navigate(['animals','basic']);
             }
         }, error => console.log(error));
    }
 
    cancel() {
        this._router.navigate(['animals','basic']);
    }
}