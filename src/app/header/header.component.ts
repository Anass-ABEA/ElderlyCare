import { Component, OnInit ,OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: String;
  subscription:Subscription;
  isInNeed:boolean;
  isAuthenticated:boolean;
  constructor(private dialog:MatDialog,
    private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.subscription = this.authservice.getUsername().
    subscribe(username=>this.username = username)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  openSignupForm(){
    const SignupRef = this.dialog.open(SignupComponent, {width: '500px', height: '500px'});
    SignupRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
  }
  openLoginForm(){
    const Loginref = this.dialog.open(LoginComponent, {width: '500px', height: '500px'});
    Loginref.afterClosed()
        .subscribe(result => {
          console.log(result);
          this.isInNeed = this.authservice.getInNeed();
          this.isAuthenticated = this.authservice.isAuthenticated;
          console.log('this user is ' +this.isInNeed);
        });
  }
  logOut(){
    this.authservice.logOut();
    this.router.navigateByUrl('/welcome');
  }
}
