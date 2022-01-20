import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/firebase/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authSvc: AuthService) { }

  async ngOnInit() {
    const actualUser = localStorage.getItem('user');
    if (actualUser != null) { 
      this.router.navigate(['/home']);
    } else {
      console.log("NO ESTA")
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
