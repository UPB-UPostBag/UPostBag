import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authSvc: AuthService) { }

  async ngOnInit() {
      
    /**
     * verificamos si ya esta registrado el usuario
     * en caso de que re direccione a home
     * sino al login google
     * (Router)
    /*/
     const actualUser = localStorage.getItem('user');
    if (actualUser != null) { 
      this.router.navigate(['/mainPage']);
    } else {
      
    }
  }

  async login() {
    try {
      await (this.authSvc.onLoginGoogle()).then(() => {
        this.router.navigate(['/home']);
      });
    } catch (error) {
      this.authSvc.logout();
      alert('Error al iniciar sesión, Favor contactarse con soporte')
    }
  }

}
