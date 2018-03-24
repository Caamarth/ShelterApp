import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AnimalService } from './animal.service';
import { AnimalModel } from './animals.model';

@Component({
    templateUrl: 'animal-details.component.html',
    styleUrls: ['animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit{

    animal: AnimalModel;
    id: number;
    animalForm: FormGroup;
    invalidForm = false;

    constructor (
        private _animalService: AnimalService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _fb: FormBuilder
    ) {
        this.animalForm = this._fb.group({
            name: ['', Validators.required],
            sex: ['', Validators.required],
            race: ['', Validators.required],
            raceType: [''],
            birthDate: [''],
            admissionDate: [''],
            weight: [''],
            width: [''],
            height: [''],
            length: [''],
            description: [''],
            classification: ['']
        });
    }

    ngOnInit() { 
        let subscription = this._activatedRoute.paramMap
           .switchMap((params: ParamMap) => {
               this.id = +params.get('id');
               if (this.id > 0) {
                   return this._animalService.getAnimal(this.id);
               }
           });

       subscription.subscribe(animal => {
           console.log(animal);
           this.animal = animal;

           if (animal) {
               this.animalForm.patchValue({
                   'name': animal.name,
                   'sex': animal.sex,
                   'race': animal.race,
                   'raceType': animal.raceType,
                   'birthDate': animal.birthDate,
                   'admissionDate': animal.admissionDate,
                   'weight': animal.weight,
                   'width': animal.width,
                   'height': animal.height,
                   'length': animal.length,
                   'description': animal.description,
                   'classification': animal.classification,
               });
           }
       })  
   }

   updateAnimal() {
       if (!this.animalForm.valid) {
           this.invalidForm = true;
           return;
       }
       let updatedAnimal = {
            id: this.id,
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
       this._animalService.updateAnimal(updatedAnimal)
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