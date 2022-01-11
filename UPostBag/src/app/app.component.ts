import { Component } from '@angular/core';
import { AuthService } from './service/firebase/auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UPostBag';
  
}
