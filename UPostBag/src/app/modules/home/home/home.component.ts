import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/service/models/shopping-list.model';
import { AuthService } from '../../../service/firebase/auth.service';
import { DatabaseService } from '../../../service/firebase/database.service';
import { ColaboratorsComponent } from '../colaborators/colaborators.component';
import { NgNavigatorShareService } from "ng-navigator-share";
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})



export class HomeComponent implements OnInit {
  actualUser;
  items;
  redirectTo:Boolean=false;
  more_was_clicked:boolean= false;
  goBack:boolean=false;
  creacionLista = new FormGroup({
    listname : new FormControl('', Validators.required ),
    isPrimary : new FormControl('')
  })
  mainInfo;

  private ngNavigatorShareService: NgNavigatorShareService;

  constructor( private authSvc: AuthService, private databaseSvc: DatabaseService, ngNavigatorShareService: NgNavigatorShareService) { 
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit(){
    this.actualUser = JSON.parse( localStorage.getItem('user') );
    this.loadItems();
  }

  loadItems(){
    this.databaseSvc.getDocumentOf("globalLists", this.mainInfo.primaryList).subscribe(res => {
      this.items = res;
      console.log("items",this.items.items);
    } );
    
  }

  login(){
    this.authSvc.onLoginGoogle();
  }

  goBackClicked(confirmation: boolean){
      this.goBack = confirmation;
      console.log(this.goBack);

      //hacer genkidama si es true
      if(this.goBack){
        this.redirectTo=false;
      }
  }

  createNewList(){
    console.log(this.creacionLista.value);
    //call dbSvc
  }

  share() {
    if (!this.ngNavigatorShareService.canShare()) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }

    this.ngNavigatorShareService
      .share({
        title: "Celcom LifeHub",
        text: "hey check out our interesting features",
        url: "https://www.celcom.com.my/life-hub/login"
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}


  

  


