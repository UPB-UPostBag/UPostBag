import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/firebase/auth.service';
import { ColaboratorsComponent } from '../colaborators/colaborators.component';
//import { AuthService } from 'src/app/service/firebase/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})



export class HomeComponent implements OnInit {

  constructor( private authSvc: AuthService ) { }

  redirectTo:boolean=false;
  more_was_clicked:boolean= false;
  goBack:boolean=false;

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    //this.authSvc.onLoginGoogle();
  }

  moreClicked(confirmation: boolean){
    this.more_was_clicked = confirmation;
    console.log(this.more_was_clicked);

    //hacer genkidama si es true
    if(this.more_was_clicked){
      this.redirectTo=!this.redirectTo;
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

  }


  

  


