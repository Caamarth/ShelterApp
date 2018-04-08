import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationService } from './application.service';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationDetailsComponent } from './application-details.component';
import { ApplicationUpdateComponent } from './application-update.component';
import { ApplicationListSelfComponent } from './application-list-self.component';
import { StudyService } from '../study/study.service';
import { StudyComponent } from '../study/study.component';
import { ApplicationCreateComponent } from './application-create.component';
import { CreateStudyComponent } from '../study/create-study.component';
import { UpdateStudyComponent } from '../study/update-study.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'applies', component: ApplicationListComponent },
            { path: 'applies/self', component: ApplicationListSelfComponent },
            { path: 'apply/update/:id', component: ApplicationUpdateComponent },
            { path: 'apply/create/:id', component: ApplicationCreateComponent },
            { path: 'apply/:id', component: ApplicationDetailsComponent },
            { path: 'apply/study/create/:id', component: CreateStudyComponent },
            { path: 'apply/study/:id', component: UpdateStudyComponent}
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        ApplicationListComponent,
        ApplicationDetailsComponent,
        ApplicationUpdateComponent,
        ApplicationListSelfComponent,
        ApplicationCreateComponent,
        StudyComponent,
        CreateStudyComponent,
        UpdateStudyComponent
    ],
    providers: [
        ApplicationService,
        StudyService
    ]
})
export class ApplicationModule {}