import { Component, OnInit } from '@angular/core';
import {request} from '../datastructure/request';
import {RequestService} from '../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { MatIconRegistry } from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  NormalRequests : request[];
  UrgentRequests : request[];
  errMessage : string;
  RequestForm:FormGroup;
  Types : Array<String> = ["Money","Medical","Food/Grossery"];
  Request:Object;

  constructor(private reqService:RequestService,private router:Router,
     private fb:FormBuilder, private authser:AuthService) { }
     inNeed:boolean;
     reqTaken:boolean = false;
     Authenticated:boolean;

  ngOnInit() {
    this.reqService.getNormalRequests()
    .subscribe(requests => {this.NormalRequests = requests;},
      errmess=> this.errMessage = <any>errmess);
      
    this.reqService.getUrgentRequests()
    .subscribe(requests => {this.UrgentRequests = requests;},
      errmess=> this.errMessage = <any>errmess);

    this.createForm();
    this.inNeed = this.authser.IsAuthenticatedInNeed;
    this.Authenticated = this.authser.isAuthenticated;
    console.log(this.inNeed);
    console.log(this.Authenticated);
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

  Clik(id:any){
      console.log(id);
  }

  requestTaken(id:any){
    this.reqService.putRequest(id)
    .subscribe(requests => this.UrgentRequests = requests.filter(el=>el.urgent));
  }
}
