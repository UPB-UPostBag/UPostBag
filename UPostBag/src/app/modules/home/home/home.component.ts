import { Component, OnInit } from '@angular/core';
import { GlobalLists } from 'src/app/service/models/global-list.model';
import { AuthService } from '../../../service/firebase/auth.service';
import { DatabaseService } from '../../../service/firebase/database.service';
import { ColaboratorsComponent } from '../colaborators/colaborators.component';
import { NgNavigatorShareService } from "ng-navigator-share";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsByDefault } from 'src/app/service/models/products-by-default.=model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})



export class HomeComponent implements OnInit {
  actualUser;
  items;
  allShoppingLists;
  productsByDefault;
  productsItem;
  positionList = 0;

  redirectTo: Boolean = false;
  more_was_clicked: boolean = false;
  goBack: boolean = false;

  creacionLista = new FormGroup({
    listname: new FormControl('', Validators.required),
    isPrimary: new FormControl(false)
  })
  userInfo;

  private ngNavigatorShareService: NgNavigatorShareService;

  constructor(private authSvc: AuthService, private databaseSvc: DatabaseService, ngNavigatorShareService: NgNavigatorShareService) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    this.loadInformation();
  }

  loadInformation() {
    // Get the User Information
    this.databaseSvc.getDocumentOf("users", this.actualUser.email).subscribe(res => {
      this.userInfo = res;
      console.log("user info:", this.userInfo);
      //Send the changes to Home (parent)
      //this.sendMainInfo.emit(this.userInfo);
    });
    //Get all the list that has been created
    this.databaseSvc.getAllOf("globalLists").subscribe(res => {
      this.allShoppingLists = res.map(e => {
        //Compare for have only those the user own
        if (this.userInfo.own.includes(e.payload.doc.id)) {
          if (this.userInfo.primaryList != e.payload.doc.id) {
            this.positionList += 1;
          }
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as GlobalLists;
        }
      }
      )

      this.productsItem = this.allShoppingLists[this.positionList].items;
    });
    // Get the global Products List
    this.databaseSvc.getDocumentOf("products", "ByDefault").subscribe(res => {
      this.productsByDefault = res;
      this.productsByDefault = this.productsByDefault.item;
      console.log("by Default", this.productsByDefault)
    });
  }

  login() {
    this.authSvc.onLoginGoogle();
  }

  goBackClicked(confirmation: boolean) {
    this.goBack = confirmation;
    console.log(this.goBack);

    //hacer genkidama si es true
    if (this.goBack) {
      this.redirectTo = false;
    }
  }

  createNewList() {
    //call dbSvc
    if (this.creacionLista.valid) {
      //added on Global list db
      var newList = this.databaseSvc.createList('globalLists', this.actualUser.email, this.creacionLista.value.isPrimary, {
        collaborator: [{
          email: this.actualUser.email,
          isOwner: true,
          name: this.actualUser.displayName,
          photoURL: this.actualUser.photoURL,
        }],
        items: [],
        name: this.creacionLista.value.listname
      });
      //close pop up
    }
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

  changeSelected(index) {
    this.positionList = index;
    this.productsItem = this.allShoppingLists[this.positionList].items;
  }

}







