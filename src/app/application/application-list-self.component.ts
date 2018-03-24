import { Component, OnInit } from "@angular/core";
import { ApplicationService } from "./application.service";
import { AuthService } from "../authentication/auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'application-list-self.component.html',
    styleUrls: ['application-list-self.component.css']
})
export class ApplicationListSelfComponent implements OnInit {

    appList: any[] = [];

    constructor(
        private _applicationService: ApplicationService,
        private _authService: AuthService,
        private _router: Router
    ) {

    }

    ngOnInit() {
        this._applicationService.getApplicationsForUser(this._authService.getId())
            .subscribe(data => {
                this.appList = data;
                console.log(data);
            }, error => { console.log(error) });
    }
}