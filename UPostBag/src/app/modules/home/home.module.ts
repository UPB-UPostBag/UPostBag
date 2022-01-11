import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

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
    RouterModule.forChild(route)
  ]
})
export class HomeModule { }
