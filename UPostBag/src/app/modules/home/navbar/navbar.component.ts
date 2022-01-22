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
  title = 'UPostBag';
  isSideNavOpened : Boolean = false;
  allShoppingLists: ShoppingList[];
  actualUser;
  userInfo;

  @Output() change_page_click = new EventEmitter<boolean>();
  @Output() sendMainInfo = new EventEmitter<any>();

  constructor( private authSvc: AuthService, private databaseSvc: DatabaseService,private router:Router  ) { }

  ngOnInit() {
    this.actualUser = JSON.parse( localStorage.getItem('user') );
    this.loadList();
  }

  login(){
    this.authSvc.onLoginGoogle();
  }

  logout(){
    this.authSvc.logout();
  }

  click_Notif_More(msg:boolean){
    this.change_page_click.emit(msg);
  }

  removeList(list){
    if( confirm("Esta seguro de eliminar" + list.name ) ){
      this.databaseSvc.deleteList(list);
    }
  }

  loadList(){
    // Get the User Information
    this.databaseSvc.getDocumentOf("users",this.actualUser.email).subscribe(res => {
      this.userInfo = res;
      //Send the changes to Home (parent)
      this.sendMainInfo.emit(this.userInfo);
    } );
    //Get all the list that has been created
    this.databaseSvc.getAllOf("globalLists").subscribe(res => {
      this.allShoppingLists = res.map( e => {
        
        //Compare for have only those the user own
        if (this.userInfo.own.includes(e.payload.doc.id)){
          
          return {
            id : e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as ShoppingList;
        }
      } )
    } );  
  }

  changeListName(){

  }

  deleteList(){

  }
}
