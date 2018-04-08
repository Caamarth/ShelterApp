import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { StudyService } from './study.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from '../application/application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'create-study.component.html',
    styleUrls: ['create-study.component.css']
})
export class CreateStudyComponent implements OnInit {

    id: number;
    application: any;
    studyForm: FormGroup;
    invalidForm = false;

    constructor(private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _studyService: StudyService,
        private _applicationService: ApplicationService,
        private _fb: FormBuilder) {
            this.studyForm = this._fb.group({
                title: ['', Validators.required],
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
                return this._applicationService.getApplication(this.id);
            });

        subscription.subscribe(application => {
            this.application = application;
        });
    }

    submitStudy() {
        if (!this.studyForm.valid) {
            this.invalidForm = true;
        }

        let newStudy = {
            title: this.studyForm.value.title,
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
            applyId: this.id
        }

        this._studyService.createStudy(newStudy).subscribe(response => {
            if (response) {
                this._router.navigate(['applies']);
            }
        }, error => {console.log(error)});
    }
}