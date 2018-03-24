import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimalListComponent } from './animal-list.component';
import { AnimalService } from './animal.service';
import { AnimalCardComponent } from './animalcard/animalcard.component';
import { AnimalListBasicComponent } from './animallistbasic/animallist-basic.component';
import { AnimalDetailsComponent } from './animal-details.component';
import { AnimalCreateComponent } from './animal-create.component';
import { AnimalComponent } from './animal.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'animals', component: AnimalListComponent },
            { path: 'animals/basic', component: AnimalListBasicComponent },
            { path: 'animals/create', component: AnimalCreateComponent },
            { path: 'animal/update/:id', component: AnimalDetailsComponent },
            { path: 'animal/:id', component: AnimalComponent }
        ])
    ],
    declarations: [
        AnimalListComponent,
        AnimalCardComponent,
        AnimalListBasicComponent,
        AnimalDetailsComponent,
        AnimalCreateComponent,
        AnimalComponent
    ],
    providers: [
        AnimalService
    ]
})
export class AnimalsModule { }