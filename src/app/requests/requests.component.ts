import { Component, OnInit } from '@angular/core';
import {request} from '../datastructure/request';
import {RequestService} from '../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { MatIconRegistry } from '@angular/material';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';


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
  currentUser:any;
  inNeed:boolean;
  reqTaken:boolean = false;
  Authenticated:boolean;
  bool:boolean;

  constructor(private reqService:RequestService,private router:Router,
    private fb:FormBuilder,
    private authser:AuthService,
    private userService: UsersService) { }
    

  ngOnInit() {
    
    this.userService.getCurrentUser()
    .subscribe(curruser => this.currentUser = curruser._id);

    this.reqService.getRequests()
    .subscribe(requests => {this.UrgentRequests = requests.filter(element=>element.urgent);
       this.NormalRequests = requests.filter(element=>!element.urgent)})

    console.log(this.UrgentRequests);
    console.log(this.NormalRequests);
    
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
    .subscribe(requests => {this.UrgentRequests = requests.filter(element=>element.urgent);
      this.NormalRequests = requests.filter(element=>!element.urgent);});
    this.authser.checkJWTtoken();
  }

  Clik(id:any){
      console.log(id);
  }

  requestTaken(id:any){
    this.reqService.putRequest(id)
    .subscribe(requests => {this.UrgentRequests = requests.filter(el=>el.urgent);
       this.NormalRequests = requests.filter(el=>!el.urgent) ; console.log(this.UrgentRequests);
        console.log(this.NormalRequests)});
  }


  MineorNot(request:any){
    if(this.currentUser == request.helps[0]._id){
      return true;
    }
    else{
      return false;
    }
  }
  
  CancelHelp(id:any){
    this.reqService.CancelHelp(id)
    .subscribe(upRequests => {this.UrgentRequests = upRequests.filter(element=>element.urgent) ;
    this.NormalRequests = upRequests.filter(element=>!element.urgent)} )
  }
}
//*ngIf= "MineorNot(request.helps[0]._id)"