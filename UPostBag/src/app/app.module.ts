import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './service/firebase/auth.service';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

const route: Routes = [
  {
    path:"", redirectTo: "home", pathMatch: "full"
  }, {
    path: "home", loadChildren:() => import("./modules/home/home.module").then(m => m.HomeModule)
  }, {
    path: "login", loadChildren:() => import("./modules/login/login.module").then(m => m.LoginModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
