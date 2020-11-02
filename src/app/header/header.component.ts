import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }

  openSignupForm(){
    const SignupRef = this.dialog.open(SignupComponent, {width: '500px', height: '500px'});
    SignupRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
  }
}
