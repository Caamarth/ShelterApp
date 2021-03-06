import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { UsersModule } from './users/users.module'

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AnimalsModule } from './animals/animals.module';
import { AuthService } from './authentication/auth.service';
import { LoginComponent } from './authentication/login.component';
import { RegisterComponent } from './authentication/register.component';
import { ApplicationModule } from './application/application.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    RouterModule.forRoot([
      { path: 'app', component: AppComponent },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: '', redirectTo: 'animals', pathMatch: 'full'},
      { path: '**', redirectTo: 'animals', pathMatch: 'full'}
    ]),
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    AnimalsModule,
    ApplicationModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
