import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

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
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
