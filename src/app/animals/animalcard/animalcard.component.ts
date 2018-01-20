import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'animal-card',
    templateUrl: 'animalcard.component.html',
    styleUrls: ['animalcard.component.css']
})
export class AnimalCardComponent implements OnInit{

    @Input() animal: any

    ngOnInit() {}
}