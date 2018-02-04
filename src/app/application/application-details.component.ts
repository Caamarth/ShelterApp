import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'application-details.component.html',
    styleUrls: ['application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

    applyForm: FormGroup;
    errorMessage: string;
    id: number;
    
    constructor (
        private _router: Router,
        private _route: ActivatedRoute,
        private _applicationService: ApplicationService,
        private _fb: FormBuilder,
        private _activatedRoute: ActivatedRoute
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
            console.log(data);
        });
    }
}