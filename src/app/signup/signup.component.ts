import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  SignupForm:FormGroup;
  NewUser:Object;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
  }


  createForm(){
    this.SignupForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      Confirmpassword:['',Validators.required],
      InNeed:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
    })
  }
}
