import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudyService } from './study.service';

@Component({
    selector: 'study-template',
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.css']
})
export class StudyComponent {
    @Input() studies: any[];
    @Input() applyId: number;

    constructor(private _router: Router,
        private _studyService: StudyService) {
        
    }

    openStudy(id) {
        this._router.navigate(['apply','study', id])
    }

    create() {
        this._router.navigate(['apply','study','create', this.applyId]);
    }
}