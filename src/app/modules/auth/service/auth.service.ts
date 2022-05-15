import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { LoginUser } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth
  ) { }

  login({ email, password }: LoginUser) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider)
  }

  register({ email, password }: LoginUser) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  logOut() {
    return signOut(this.auth)
  }

}
