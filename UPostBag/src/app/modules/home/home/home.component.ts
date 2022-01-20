import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/service/models/shopping-list.model';
import { AuthService } from '../../../service/firebase/auth.service';
import { DatabaseService } from '../../../service/firebase/database.service';
import { ColaboratorsComponent } from '../colaborators/colaborators.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})



export class HomeComponent implements OnInit {
  actualUser;
  allShoppingLists: ShoppingList[];
  redirectTo:Boolean=false;
  more_was_clicked:boolean= false;
  goBack:boolean=false;

  constructor( private authSvc: AuthService, private databaseSvc: DatabaseService) { }

  ngOnInit(){
    this.actualUser = JSON.parse( localStorage.getItem('user') );
    this.getAllList();
  }

  login(){
    this.authSvc.onLoginGoogle();
  }

  getAllList(){
    this.databaseSvc.getAllList().subscribe(res => {
      this.allShoppingLists = res.map( e => {
        return {
          id : e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as ShoppingList;
      } )
    } ); 
  }

  removeList(list){
    if( confirm("Esta seguro de eliminar" + list.name ) ){
      this.databaseSvc.deleteList(list);
    }
  }

  goBackClicked(confirmation: boolean){
      this.goBack = confirmation;
      console.log(this.goBack);

      //hacer genkidama si es true
      if(this.goBack){
        this.redirectTo=false;
      }
  }


  redirectToAppStore= function () {
    window.open('https://www.microsoft.com/es-bo/store/apps/windows');
  };





}


  

  


