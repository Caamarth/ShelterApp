import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 

    userName: string;

    constructor (
        private _authService: AuthService,
        private _router: Router) {

    }

    isAuthenticated() {
        return this._authService.userIsAuthenticated();
    }

    getUserName() {
        return this._authService.getUserName();
    }

    logout() {
        this._authService.logout();
    }

    getSelf() {
        return this._authService.loggedInUser.id;
    }
}