import { Component, OnInit } from '@angular/core';
import { AnimalService } from './animal.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

    filterForm: FormGroup;
    animalList: any[];
    filteredAnimals: any[];
    sortOrder: string;
    sortKey: string;
    constructor(
        private _animalService: AnimalService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this._animalService.getAnimals().subscribe(resp => {
            this.animalList = resp;
            this.filteredAnimals = this.animalList;
        }, error => console.log(error.status));
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.filterForm = this._fb.group({
            raceType: [''],
            sex: [''],
            classification: ['']
        });
    }

    findValue(obj, key) {
        return obj[key];
    }

    filter() {
        this.filteredAnimals = this.animalList;
        Object.keys(this.filterForm.controls).forEach(key => {
            if (this.filterForm.get(key).value) {
                this.filteredAnimals = this.filteredAnimals.filter(x => this.findValue(x,key) == this.filterForm.get(key).value);
            }
        });
    }

    sort() {
        if (this.sortOrder === 'asc') {
            this.filteredAnimals = this.filteredAnimals.sort((x1, x2) => {
                if (this.findValue(x1,this.sortKey) > this.findValue(x2,this.sortKey)) {
                    return 1;
                }
                if (this.findValue(x1,this.sortKey) < this.findValue(x2,this.sortKey)) {
                    return -1;
                }
                return 0;
            });
        }
        if (this.sortOrder === 'desc') {
            this.filteredAnimals = this.filteredAnimals.sort((x1, x2) => {
                if (this.findValue(x1,this.sortKey) > this.findValue(x2,this.sortKey)) {
                    return -1;
                }
                if (this.findValue(x1,this.sortKey) < this.findValue(x2,this.sortKey)) {
                    return 1;
                }
                return 0;
            });
        }
    }

    resetFilter() {
        this.filteredAnimals = this.animalList;
        this.initForm();
    }
 }