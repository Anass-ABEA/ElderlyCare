import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public authservice:AuthService) { }
  canActivate():boolean{
    if(!this.authservice.isLoggedIn()){
      return false;
    }
    else{
      return true;
    }
  }
}
