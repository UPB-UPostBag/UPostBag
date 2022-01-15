import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/service/firebase/database.service';
import { ShoppingList } from 'src/app/service/models/shopping-list.model';
import { AuthService } from '../../../service/firebase/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSideNavOpened : Boolean = false;
  allShoppingLists: ShoppingList[];

  constructor( private authSvc: AuthService, private databaseSvc: DatabaseService ) { }

  ngOnInit() {
    this.getAllList();
    console.log(this.allShoppingLists);
  }

  login(){
    this.authSvc.onLoginGoogle();
  }

  logout(){
    this.authSvc.logout();
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

  redirectToCOllaborator(){
    
  }
}
