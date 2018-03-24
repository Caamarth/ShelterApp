import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UsersService } from './users.service';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'users', component: UserListComponent },
            { path: 'user/:id', component: UserDetailsComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        UserListComponent,
        UserDetailsComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}