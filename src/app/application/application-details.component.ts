import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationModel } from './application.model';
import { StudyService } from '../study/study.service';

@Component({
    templateUrl: 'application-details.component.html',
    styleUrls: ['application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

    application: ApplicationModel;
    errorMessage: string;
    id: number;
    studies: any[];
    
    constructor (
        private _router: Router,
        private _route: ActivatedRoute,
        private _applicationService: ApplicationService,
        private _fb: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _studyService: StudyService
    ) {

    }
    ngOnInit() {
        let subscription = this._activatedRoute.paramMap
            .switchMap((params: ParamMap) => {
                this.id = +params.get('id');
                if (this.id > 0) {
                    return this._applicationService.getApplication(this.id);
                }
            });

        subscription.subscribe(data => {
            this.application = data;
        });

        this._studyService.getStudiesForApplication(this.id).subscribe(data => {
            if (data) {
                this.studies = data;
            }
        })
    }
}