import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './service/firebase/auth.service';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const route: Routes = [
  {
    path:"", redirectTo: "login", pathMatch: "full"
  }, {
    path: "home", loadChildren:() => import("./modules/home/home.module").then(m => m.HomeModule)
  }, {
    path: "login", loadChildren:() => import("./modules/login/login.module").then(m => m.LoginModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route),
    //FireBase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
