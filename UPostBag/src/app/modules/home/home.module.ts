import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgSwipeToDeleteModule } from 'ng-swipe-to-delete';

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
    RouterModule.forChild(route),
    //Angular Material
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    HammerModule,
    BrowserModule,
    NgSwipeToDeleteModule


  ],
})
export class HomeModule { }
