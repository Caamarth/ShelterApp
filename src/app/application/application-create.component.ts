import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApplicationCreateModel } from './application.model';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: 'application-create.component.html',
    styleUrls: ['application-create.component.css']
})
export class ApplicationCreateComponent  implements OnInit {

    AnimalId: number;
    apply: ApplicationCreateModel;
    form: FormGroup;

    constructor(
        private _applicationService: ApplicationService,
        private _fb: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {

        this.form = this._fb.group({
            description: ['', Validators.required]
        });

    }

    ngOnInit() {
        let subscription = this._activatedRoute.paramMap
           .switchMap((params: ParamMap) => {
               let id = +params.get('id');
               return Observable.of(id);
           });

        subscription.subscribe(data => {
            this.AnimalId = data;
        });
    }

    submit() {
        let apply2 = {
            animalId: this.AnimalId,
            userId: +localStorage.getItem('id'),
            description: this.form.controls.description.value
        }
        
        console.log(apply2);
        this._applicationService.createApplication(apply2).subscribe(resp => {
            if (resp) {
                this._router.navigate(['']);
            }
        })
    }

    cancel() {
        this._router.navigate(['animal', this.AnimalId]);
    }
}