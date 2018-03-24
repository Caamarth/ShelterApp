import { Component, Input } from '@angular/core';

@Component({
    selector: 'study-template',
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.css']
})
export class StudyComponent {
    @Input() studies: any[];

    constructor() {
        
    }

    openStudy(id) {

    }
}