import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { UsersModule } from './users/users.module'

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AnimalsModule } from './animals/animals.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    RouterModule.forRoot([
      { path: 'app', component: AppComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: '**', redirectTo: 'users', pathMatch: 'full'}
    ]),
    FormsModule,
    UsersModule,
    AnimalsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
