import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:Object;
  loginForm:FormGroup;
  errMess: string;

  loginError={
    username:'',
    password:''
  }
  messageError={
    username:{
      required:'Username is required.',
    },
    password:{
      required:'Password is required.',
    }
  }
  constructor(private fb: FormBuilder, private router:Router, private authService:AuthService) {
    this.createForm()
  }
  ngOnInit() {
  }
createForm(){
  this.loginForm = this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  });
  this.loginForm.valueChanges.subscribe(data=>this.OnValueChange(data))
};

OnValueChange(data:any){
  if(!this.loginForm){
    return ;
  }
  const form = this.loginForm;
  for(const element in this.loginError){
    if(this.loginError.hasOwnProperty(element)){
      this.user = {username:this.loginForm.controls['username'].value, password:this.loginForm.controls['password'].value};
      this.loginError[element]='';
      const control = form.get(element);
      if (control && control.dirty && !control.valid){
          const messages = this.messageError[element];
          for(const key in control.errors){
            if (control.errors.hasOwnProperty(key)) {
            this.loginError[element] = messages[key] + ' ';
            }
          }
          

      }

    }

  }
}

onSubmit() {
  console.log('User: ', this.user);
  this.authService.logIn(this.user)
    .subscribe(res => {
      if (res.success) {
        this.router.navigate(['welcome']);
      } else {
        console.log(res);
      }
    },
    error => {
      console.log(error);
      this.errMess = error;
    });
}

}