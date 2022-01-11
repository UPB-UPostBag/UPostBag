import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

const route: Routes = [
  {
    path: "", component: HomeComponent
  }

];

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    //Angular Material
    MatSidenavModule,
    
  ]
})
export class HomeModule { }
