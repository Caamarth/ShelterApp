import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApplicationModel } from './application.model';
import { AuthService } from '../authentication/auth.service';

@Component({
    templateUrl: 'application-update.component.html',
    styleUrls: ['application-update.component.css']
})
export class ApplicationUpdateComponent implements OnInit {

    application: ApplicationModel;
    applicationForm: FormGroup
    id: number;

    constructor ( 
        private _applicationService: ApplicationService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fb: FormBuilder,
        private _authService: AuthService
    ) {
        this.applicationForm = this._fb.group({
            applyStatus: [''],
            description: [''],
        });
    }

    ngOnInit() {
        let subscription = this._activatedRoute.paramMap
           .switchMap((params: ParamMap) => {
               this.id = +params.get('id');
               if (this.id > 0) {
                   return this._applicationService.getApplication(this.id);
               }
           });

       subscription.subscribe(application => {
           console.log(application);
           this.application = application;

           if (application) {
               this.applicationForm.patchValue({
                   'applyStatus': application.applyStatus,
                   'description': application.description
               });
           }
       })
    }

    updateApplication() {
        let updatedApplication = this.application;
        updatedApplication.applyStatus = this.applicationForm.value.applyStatus;
        updatedApplication.description = this.applicationForm.value.description;

        console.log(updatedApplication);
    }

    cancel() {
        this._router.navigate(['']);
    }

    isOwnApplication() {
        if (this._authService.loggedInUser) {
            return this._authService.loggedInUser.id == this.application.userEntityId;
        }
        return false;
    }
    
}