import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductByDefaultComponent } from './product-by-default/product-by-default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
const route: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "addcolaborators", component: ColaboratorsComponent
  },
  {
    path: "navbar", component: NavbarComponent
  },

];

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    ColaboratorsComponent,
    ProductItemComponent,
    ProductByDefaultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    //Angular Material
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCardModule
    
  ]
})
export class HomeModule { }
