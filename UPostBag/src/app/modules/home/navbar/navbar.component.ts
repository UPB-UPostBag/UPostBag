import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/firebase/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private authSvc: AuthService ) { }

  ngOnInit(): void {
  }

  login(){
    this.authSvc.onLoginGoogle();
  }

  logout(){
    this.authSvc.logout();
  }
}
