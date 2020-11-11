import { Component, OnInit } from '@angular/core';
import {request} from '../datastructure/request';
import {RequestService} from '../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { MatIconRegistry } from '@angular/material';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  Requests : request[];
  errMessage : string;
  RequestForm:FormGroup;
  Types : Array<String> = ["Money","Medical","Food/Grossery"];
  Request:Object;

  constructor(private reqService:RequestService,
     private fb:FormBuilder, private authser:AuthService) { }
     inNeed: boolean = this.authser.IsAuthenticatedInNeed;
     Authenticated : boolean = this.authser.isAuthenticated;
  ngOnInit() {
    console.log(this.inNeed);
    console.log(this.Authenticated);
    this.reqService.getRequests()
    .subscribe(requests => {this.Requests = requests; console.log(this.Requests)},
      errmess=> this.errMessage = <any>errmess);
    this.createForm();
  }
  

  createForm(){
    this.RequestForm = this.fb.group({
    type:'Type of request ?',
    familySituation:['',Validators.required],
    subject:['',Validators.required],
    loading:false,
    reqResponded:false,
    urgent:false,
    dueDate: ['',Validators.required],
    })
  }

  onSubmit(){
    this.Request = {
    type:this.RequestForm.controls['type'].value,
    familySituation:this.RequestForm.controls['familySituation'].value,
    subject: this.RequestForm.controls['subject'].value,
    loading:this.RequestForm.controls['loading'].value,
    reqResponded:this.RequestForm.controls['reqResponded'].value,
    urgent:this.RequestForm.controls['urgent'].value,
    dueDate:this.RequestForm.controls['dueDate'].value}
    this.reqService.postRequest(this.Request)
    .subscribe(res=>{console.log(res)});
    this.authser.checkJWTtoken();
  }


  
}
