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
  myLists;
  myEmail = "georgeilr99@gmail.com";
  actualUser;

  constructor( private authSvc: AuthService, private databaseSvc: DatabaseService,private router:Router  ) { }

  ngOnInit() {
    this.actualUser = JSON.parse( localStorage.getItem('user') );
    this.loadList();
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
    this.databaseSvc.getAllOf("globalLists").subscribe(res => {
      this.allShoppingLists = res.map( e => {
        if (this.myLists.own.includes(e.payload.doc.id)){
          return {
            id : e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as ShoppingList;
        }
      } )
    } );  
  }

  loadList(){
    this.databaseSvc.getDocumentOf("users",this.actualUser.email).subscribe(res => {
      this.myLists = res;
    } );  
  }
}
