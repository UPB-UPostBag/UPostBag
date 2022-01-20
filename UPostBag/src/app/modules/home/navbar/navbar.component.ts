import { Component, OnInit,  EventEmitter, Output, Input } from '@angular/core';;
import { DatabaseService } from 'src/app/service/firebase/database.service';
import { ShoppingList } from 'src/app/service/models/shopping-list.model';
import { AuthService } from '../../../service/firebase/auth.service';
import{Router} from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSideNavOpened : Boolean = false;
  allShoppingLists: ShoppingList[];
  myEmail = "georgeilr99@gmail.com";

  constructor( private authSvc: AuthService, private databaseSvc: DatabaseService,private router:Router  ) { }

  ngOnInit() {
    this.getLists();
  }

  login(){
    this.authSvc.onLoginGoogle();
  }

  logout(){
    this.authSvc.logout();
    
  }

  title = 'UPostBag';

  @Output() change_page_click = new EventEmitter<boolean>();

  click_Notif_More(msg:boolean){
    this.change_page_click.emit(msg);
  }

  removeList(list){
    if( confirm("Esta seguro de eliminar" + list.name ) ){
      this.databaseSvc.deleteList(list);
    }
  }

  getLists(){
    this.databaseSvc.getAllOf("shoppingList").subscribe(res => {
      this.allShoppingLists = res.map( e => {
        return {
          id : e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as ShoppingList;
      } )
    } );  
    //Aqui necesito mis listas, no todas las listas (filtrado)
  }
}
