import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UsersService } from './users.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'users', component: UserListComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        UserListComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}