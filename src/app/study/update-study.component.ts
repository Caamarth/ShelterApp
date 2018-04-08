import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StudyService } from './study.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'update-study.component.html',
    styleUrls: ['update-study.component.css']
})
export class UpdateStudyComponent implements OnInit {

    id: number;
    study: any;
    studyForm: FormGroup;
    invalidForm = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _studyService: StudyService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this.studyForm = this._fb.group({
            rating: [''],
            size: [''],
            numberOfRooms: [''],
            numberOfPeople: [''],
            numberOfAnimals: [''],
            homeTypeLevel: [''],
            comfortTypeLevel: [''],
            habitabilityLevel: [''],
            cleanLevel: [''],
            description: ['']
        })
    }

    ngOnInit() {
        let subscription = this._activatedRoute.paramMap
            .switchMap((params: ParamMap) => {
                this.id = +params.get('id');
                return this._studyService.getStudy(this.id);
            });

        subscription.subscribe(study => {
            console.log(study);
            this.study = study;

            this.studyForm.patchValue({
                'rating': study.rating,
                'size': study.size,
                'numberOfRooms': study.numberOfRooms,
                'numberOfPeople': study.numberOfPeople,
                'numberOfAnimals': study.numberOfAnimals,
                'homeTypeLevel': study.homeTypeLevel,
                'comfortTypeLevel': study.comfortLevel,
                'habitabilityLevel': study.habitabilityLevel,
                'cleanLevel': study.cleanLevel,
                'description': study.description
            });
        });
    }

    submitStudy() {
        if (!this.studyForm.valid) {
            this.invalidForm = true;
        }

        let newStudy = {
            id: this.study.id,
            title: this.study.title,
            publishDate: this.study.publishDate,
            rating: this.studyForm.value.rating,
            size: this.studyForm.value.size,
            numberOfRooms: this.studyForm.value.numberOfRooms,
            numberOfPeople: this.studyForm.value.numberOfPeople,
            numberOfAnimals: this.studyForm.value.numberOfAnimals,
            homeTypeLevel: this.studyForm.value.homeTypeLevel,
            comfortLevel: this.studyForm.value.comfortTypeLevel,
            habitabilityLevel: this.studyForm.value.habitabilityLevel,
            cleanLevel: this.studyForm.value.cleanLevel,
            description: this.studyForm.value.description,
            applyId: this.study.applyId
        }

        this._studyService.updateStudy(newStudy, this.id).subscribe(response => {
            if (response) {
                this._router.navigate(['applies']);
            }
        }, error => {console.log(error)});
    }
}