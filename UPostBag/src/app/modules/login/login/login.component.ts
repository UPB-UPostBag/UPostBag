import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/service/firebase/database.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../service/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  allUsers;
  actualUser;

  constructor(private router: Router, private authSvc: AuthService, private databaseSvc: DatabaseService) { }

  async ngOnInit() {
    const actualUser = localStorage.getItem('user');
    if (actualUser != null) {
      this.router.navigate(['/home']);
    }
  }

  async login() {
    try {
      await (this.authSvc.onLoginGoogle()).then(() => {
        this.actualUser = JSON.parse(localStorage.getItem('user'));
        //get all of user
        this.allUsers = this.databaseSvc.getAllOf(environment.firebaseCollections.allUsers).subscribe(res => {
          this.allUsers = res.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as {}
            };
          });
          if (this.allUsers.find(e => e.id == this.actualUser.email)) {
            this.router.navigate(['/home']);
          } else {
            this.createNewListAndUser();
          }
        });
      });
    } catch (error) {
      this.authSvc.logout();
      alert('Error al iniciar sesión, Favor contactarse con soporte')
    }
  }

  createNewListAndUser() {
    this.databaseSvc.createDocumentOnWithID(environment.firebaseCollections.allUsers, this.actualUser.email, {
      collab: [],
      own: [],
      primaryList: "default"
    });
    this.databaseSvc.createList(environment.firebaseCollections.Lists, this.actualUser.email, true, {
      collaborator: [{
        email: this.actualUser.email,
        isOwner: true,
        name: this.actualUser.displayName,
        photoURL: this.actualUser.photoURL,
      }],
      items: [],
      name: "Lista Primaria"
    });
  }

}
