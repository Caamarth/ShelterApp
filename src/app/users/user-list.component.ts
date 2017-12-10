import { Component } from '@angular/core';
import { UsersService } from './users.service'

@Component({
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

    userList;

    constructor(
        private _userService: UsersService
    ) {
        this._userService.getUsers().subscribe(resp => {
            this.userList = resp;
            console.log(this.userList);
        }, error => { console.log(error)} );
     }
}