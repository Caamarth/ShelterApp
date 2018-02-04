import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from './application.service';
import { ApplicationModel } from './application.model';

@Component({
    templateUrl: 'application-list.component.html',
    styleUrls: ['application-list.component.css']
})
export class ApplicationListComponent {

    applies: ApplicationModel[] = [];
    errorMessage: string;

    constructor (
        private _applicationService: ApplicationService,
        private _router: Router
    ) {
        this.getApplications();
    }

    getApplications() {
        this._applicationService.getApplications().subscribe(data => {
            if (data) {
                this.applies = data;
                console.log(this.applies);
            }
        }, error => console.log(error));
    }

    openApply(id) {
        this._router.navigate(['apply', id]);
    }

    deleteApply(id) {
        this._applicationService.deleteApplication(id).subscribe(resp => {
            if (resp) {
                this.getApplications();
            }
        }, error => { console.log(error)});
    }


}