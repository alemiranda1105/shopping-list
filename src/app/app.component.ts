import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-list';
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }
  logOut() {
    this.authService.logOut()
    .then(() => this.router.navigate(['/']))
    .catch(e => console.log(e.message))
  }
}
