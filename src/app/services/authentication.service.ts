import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { from, of, switchMap } from 'rxjs';
import { UserForLogin } from '../models/authenticationModels/userForLogin';
import { UserForRegister } from '../models/authenticationModels/userForRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly currentUser$  = authState(this.auth)
  
  constructor(private auth:Auth) { }

  login(userForLoginModel:UserForLogin){
    const {email,password} = userForLoginModel;
    return from(signInWithEmailAndPassword(this.auth,email,password));
  }

  register(userForRegisterModel:UserForRegister){
    const {email,password,firstName,lastName} = userForRegisterModel;
    const displayNameModel = firstName + "_" + lastName;
    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({user}) => updateProfile(user,{displayName:displayNameModel}))
    )
  }
  
  logout(){
    return from(this.auth.signOut())
  }

}
