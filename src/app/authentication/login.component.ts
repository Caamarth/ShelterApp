import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this.loginForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    login() {
        if (!this.loginForm.valid) {

        }
    }
}