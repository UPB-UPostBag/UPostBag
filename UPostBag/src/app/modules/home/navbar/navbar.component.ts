import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';;
import { DatabaseService } from 'src/app/service/firebase/database.service';
import { GlobalLists } from 'src/app/service/models/global-list.model';
import { AuthService } from '../../../service/firebase/auth.service';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'UPostBag';
  isSideNavOpened: Boolean = false;
  @Input() allShoppingLists: GlobalLists[];
  @Input() Selected;
  @Input() userInfo;
  actualUser;

  @Output() sendSelected = new EventEmitter<any>();
  @Output() sendNewNameList = new EventEmitter<any>();
  @Output() change_page_click = new EventEmitter<boolean>();

  constructor(
    private authSvc: AuthService, 
    private databaseSvc: DatabaseService) { }

  ngOnInit() {
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    for (let index = 0; index < this.allShoppingLists.length; index++) {
      if(this.allShoppingLists[index].id == this.userInfo.primaryList){
        this.Selected = index;
        this.listSelected(index);
        break;
      }
    }
  }

  login() {
    this.authSvc.onLoginGoogle();   
  }

  logout() {
    this.authSvc.logout();
  }

  click_Notif_More(msg: boolean) {
    this.change_page_click.emit(msg);
  }
  
  deleteList(list) {
    if (confirm("Esta seguro de eliminar" + list.name)) {
     this.databaseSvc.deleteList(list);
    }
  }
  
  share(list){
    //
  }
  
  createNewList(){
    console.log("log", this.allShoppingLists) 
  }
  
  changeListName(list) {
    this.sendNewNameList.emit(list)
  }

  listSelected(index){
    this.Selected = index;
    //send to home (father)
    this.sendSelected.emit(index);
  }

  makePrimaryList(list){
    this.databaseSvc.changePrimaryList(list.id,this.actualUser.email);
  }
}
