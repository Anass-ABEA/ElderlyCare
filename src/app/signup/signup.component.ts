import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  SignupForm:FormGroup;
  NewUser:Object;
  
  constructor(private fb:FormBuilder,
    private Matref:MatDialogRef<SignupComponent>,
    private autservice: AuthService) { }

  ngOnInit() {
    this.createForm();
  }


  createForm(){
    this.SignupForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      Confirmpassword:['',Validators.required],
      inNeed: true,
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      mail:['',[Validators.required,Validators.email]],
      telNumber:['',[Validators.required,Validators.pattern("^[0-9]*$"),]]
    })
  }
  onSubmit(){
    this.NewUser = this.SignupForm.value;
    this.autservice.signUp(this.NewUser)
    .subscribe(res=>{
      if(res.succes){
        this.Matref.close(true);
      }
      else{
        console.log(res);
      }
    })
  }

  ConfirmationWrong(){
    if(this.SignupForm.controls['password'].value != this.SignupForm.controls['Confirmpassword'].value){
      return true;
    }
    else{
      return false;
    }
  }
}
