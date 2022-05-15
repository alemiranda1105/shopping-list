import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/interfaces/User';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  login(loginData: LoginUser) {
    this.authService.login(loginData)
    .then(() => this.router.navigate(['/shop/list']))
    .catch(e => console.log(e.message))
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
    .then(() => this.router.navigate(['/shop/list']))
    .catch(e => console.log(e.message))
  }

}
