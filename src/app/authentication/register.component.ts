import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {

    registerForm: FormGroup;
    invalidForm = false;

    constructor (
        private _usersService: UsersService,
        private _authService: AuthService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this.registerForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    register() {
        if (!this.registerForm.valid) {
            this.invalidForm = true;
            return;
        }
        this._authService.registerUser(this.registerForm.value)
            .subscribe(resp => {
                if (resp) {
                    this._router.navigate(['animals']);
                }
            }, error => console.log('error'));
    }
}