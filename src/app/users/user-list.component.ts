import { Component } from '@angular/core';
import { UsersService } from './users.service'
import { Router } from '@angular/router';

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

    userList;

    constructor(
        private _userService: UsersService,
        private _router: Router
    ) {
        this.getUsers();
     }

     getUsers() {
        this._userService.getUsers().subscribe(resp => {
            this.userList = resp;
        }, error => { console.log(error)} );
     }

     openUser(id) {
        this._router.navigate(['user', id]);
     }

     deleteUser(id) {
         this._userService.deleteUser(id).subscribe(resp => {
             if (resp) {
                 this.getUsers();
             }
         }, error => console.log(error));
     }
}