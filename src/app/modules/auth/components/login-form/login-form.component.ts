import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/interfaces/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() formData: EventEmitter<LoginUser> = new EventEmitter();

  userForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  getEmail() {
    return this.userForm.get('email')
  }

  getPassword() {
    return this.userForm.get('password')
  }

  onSubmit() {
    this.formData.emit(this.userForm.value)
  }

}
