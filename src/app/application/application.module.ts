import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationService } from './application.service';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationDetailsComponent } from './application-details.component';
import { ApplicationUpdateComponent } from './application-update.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'applies', component: ApplicationListComponent },
            { path: 'apply/update/:id', component: ApplicationUpdateComponent },
            { path: 'apply/:id', component: ApplicationDetailsComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        ApplicationListComponent,
        ApplicationDetailsComponent,
        ApplicationUpdateComponent
    ],
    providers: [
        ApplicationService
    ]
})
export class ApplicationModule {}