import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserModel } from './users.model';
import 'rxjs/add/operator/switchMap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
    templateUrl: 'user-details.component.html',
    styleUrls: ['user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    currentUser: UserModel;
    id: number;
    userForm: FormGroup;
    invalidForm = false;

    constructor (
        private _userService: UsersService,
        private _activatedRoute: ActivatedRoute,
        private _fb: FormBuilder,
        private _router: Router
    ) {
        this.userForm = this._fb.group({
            username: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            address: [''],
            birthdate: [''],
            emailAddress: [''],
            phoneNumber: ['']
        })
    }

    ngOnInit() { 
         let subscription = this._activatedRoute.paramMap
            .switchMap((params: ParamMap) => {
                this.id = +params.get('id');
                if (this.id > 0) {
                    return this._userService.getUser(this.id);
                }
            });

        subscription.subscribe(user => {
            console.log(user);
            this.currentUser = user;

            if (user) {
                this.userForm.patchValue({
                    'username': user.username,
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'address': user.address,
                    'birthdate': user.birthdate,
                    'emailAddress': user.emailAddress,
                    'phoneNumber': user.phoneNumber
                });
            }
        })  
    }

    submitUser() {
        if (!this.userForm.valid) {
            this.invalidForm = true;
            return;
        }
        
        let updatedUser = {
            id: this.id,
            username: this.userForm.value.username,
            password: this.currentUser.password,
            firstname: this.userForm.value.firstname,
            lastname: this.userForm.value.lastname,
            address: this.userForm.value.address,
            birthdate: this.userForm.value.birthdate,
            emailAddress: this.userForm.value.emailAddress,
            phoneNumber: this.userForm.value.phoneNumber,
            role: this.currentUser.role
        }

        this._userService.updateUser(updatedUser).subscribe(resp => {
            if (resp) {
                this._router.navigate(['users']);
            }
        }, error => console.log(error));
        
    }
}































                