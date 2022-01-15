import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import{Router} from '@angular/router';

const route: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "addcolaborators", component: ColaboratorsComponent
  }

];

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ColaboratorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class HomeModule { }
