import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';;
import { DatabaseService } from 'src/app/service/firebase/database.service';
import { GlobalLists } from 'src/app/service/models/global-list.model';
import { AuthService } from '../../../service/firebase/auth.service';
import { Router } from '@angular/router';


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
  actualUser;
  userInfo;

  @Output() change_page_click = new EventEmitter<boolean>();
  @Output() sendSelected = new EventEmitter<any>();

  constructor(
    private authSvc: AuthService, 
    private databaseSvc: DatabaseService, 
    private router: Router) { }

  ngOnInit() {
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    //this.loadList();
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

  removeList(list) {
    if (confirm("Esta seguro de eliminar" + list.name)) {
      this.databaseSvc.deleteList(list);
    }
  }

  changeListName(list, newNameList : string) {
      list.name=newNameList;
      this.databaseSvc.updateList(list, list.id);  //???????
    
  }

  deleteList(list) {
    this.databaseSvc.deleteList(list);
  }

  share(list){
    //
  }

  createNewList(){
    
  }

  listSelected(index){
    console.log("index", index);
    this.Selected = index;
    //send to home (father)
    this.sendSelected.emit(index);
  }
}
