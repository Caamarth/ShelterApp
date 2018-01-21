import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;
    errorMessage: string;
    loginInvalid = false;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this.loginForm = this._fb.group({
            Username: ['', Validators.required],
            Password: ['', Validators.required]
        })
    }

    login() {
        this.loginInvalid = false;
        if (!this.loginForm.valid) {
            this.errorMessage = 'A mezők kitöltése kötelező!';
            this.loginInvalid = true;
        }
        this._authService.login(this.loginForm.value).subscribe(resp => {
            sessionStorage.setItem('token',resp.token);
            this._authService.setLoggedInUser(resp.user);
            sessionStorage.setItem('userName',resp.user.username);
            this._router.navigate(['animals']);
        });
    }
}