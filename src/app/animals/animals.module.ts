import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimalListComponent } from './animal-list.component';
import { AnimalService } from './animal.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'animals', component: AnimalListComponent }
        ])
    ],
    declarations: [
        AnimalListComponent
    ],
    providers: [
        AnimalService
    ]
})
export class AnimalsModule { }