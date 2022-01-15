import { Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/service/firebase/auth.service';
import{Router} from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor( private authSvc: AuthService, private router:Router ) { }

 

  ngOnInit(): void {
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

}
