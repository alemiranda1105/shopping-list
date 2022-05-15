import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/interfaces/User';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  register(userData: LoginUser) {
    this.authService.register(userData)
      .then(() => this.router.navigate(['/login']))
      .catch(e => console.log(e.message))
  }

}
