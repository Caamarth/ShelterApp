import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AnimalService } from './animal.service';
import { AnimalModel } from './animals.model';

@Component({
    templateUrl: 'animal-details.component.html',
    styleUrls: ['animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit{

    animal: AnimalModel;
    id: number;
    animalForm: FormGroup;
    invalidForm = false;
    public file_srcs: string[] = [];

    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];

    constructor (
        private _animalService: AnimalService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _fb: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.animalForm = this._fb.group({
            name: ['', Validators.required],
            sex: ['', Validators.required],
            race: ['', Validators.required],
            raceType: [''],
            birthDate: [''],
            admissionDate: [''],
            weight: [''],
            width: [''],
            height: [''],
            length: [''],
            description: [''],
            classification: ['']
        });
    }

    ngOnInit() { 
        let subscription = this._activatedRoute.paramMap
           .switchMap((params: ParamMap) => {
               this.id = +params.get('id');
               if (this.id > 0) {
                   return this._animalService.getAnimal(this.id);
               }
           });

       subscription.subscribe(animal => {
           console.log(animal);
           this.animal = animal;

           if (animal) {
               this.animalForm.patchValue({
                   'name': animal.name,
                   'sex': animal.sex,
                   'race': animal.race,
                   'raceType': animal.raceType,
                   'birthDate': animal.birthDate,
                   'admissionDate': animal.admissionDate,
                   'weight': animal.weight,
                   'width': animal.width,
                   'height': animal.height,
                   'length': animal.length,
                   'description': animal.description,
                   'classification': animal.classification,
               });
           }
       })  
   }

   updateAnimal() {
       if (!this.animalForm.valid) {
           this.invalidForm = true;
           return;
       }
       let updatedAnimal = {
            id: this.id,
            name: this.animalForm.value.name,
            sex: this.animalForm.value.sex,
            race: this.animalForm.value.race,
            raceType: this.animalForm.value.raceType,
            birthDate: this.animalForm.value.birthDate,
            admissionDate: this.animalForm.value.admissionDate,
            weight: this.animalForm.value.weight,
            width: this.animalForm.value.width,
            height: this.animalForm.value.height,
            length: this.animalForm.value.length,
            description: this.animalForm.value.description,
            classification: this.animalForm.value.classification

       }
       this.upload(this.file_srcs);
       this._animalService.updateAnimal(updatedAnimal)
        .subscribe(resp => {
            if (resp) {
                this._router.navigate(['animals','basic']);
            }
        }, error => console.log(error));
   }

   upload(images) {
       this._animalService.uploadImages(this.id, images).subscribe(resp => {
           
       }, error => console.log(error));
   }

   cancel() {
       this._router.navigate(['animals','basic']);
   }

   fileChange(input){
    this.readFiles(input.files);
  }
  
  readFile(file, reader, callback){
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    }
    
    // Read the file
    reader.readAsDataURL(file);
  }
  
    readFiles(files, index=0){
      // Create the file reader
      let reader = new FileReader();
      
      // If there is a file
      if (index in files) {
        // Start reading this file
        this.readFile(files[index], reader, (result) =>{
          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = result;
          
          // Send this img to the resize function (and wait for callback)
          this.resize(img, 250, 250, (resized_jpeg, before, after)=>{
            // For debugging (size in bytes before and after)
            this.debug_size_before.push(before);
            this.debug_size_after.push(after);
  
            // Add the resized jpeg img source to a list for preview
            // This is also the file you want to upload. (either as a
            // base64 string or img.src = resized_jpeg if you prefer a file). 
            this.file_srcs.push(resized_jpeg);
            
            // Read the next file;
            this.readFiles(files, index+1);
          });
        });
      }else{
        // When all files are done This forces a change detection
        this.changeDetectorRef.detectChanges();
      }
    }

  
  resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {
      console.log("img loaded");
      // Get the images current width and height
      var width = img.width;
      var height = img.height;
      
      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
          }
      } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
          }
      }
      
      // create a canvas object
      var canvas = document.createElement("canvas");
    
      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");  

      ctx.drawImage(img, 0, 0,  width, height); 
      
      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');
      
      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }
}