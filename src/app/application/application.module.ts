import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationService } from './application.service';

@NgModule({
    imports: [
        RouterModule.forChild([

        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [],
    declarations: [

    ],
    providers: [
        ApplicationService
    ]
})
export class ApplicationModule {}