import { Component, OnInit ,OnDestroy} from '@angular/core';
import {RequestService} from '../services/request.service';
import {request} from '../datastructure/request';
import {UsersService} from '../services/users.service';
import {user} from '../datastructure/user';


@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.scss']
})
export class MyrequestsComponent implements OnInit {
  NowComment:Boolean = false;
  CurrentUser: user;
  Myrequests:request[];
  constructor(private requestService: RequestService,
  private userService : UsersService) { }
  ngOnInit(){
   this.requestService.getMyRequests()
   .subscribe(myrequests=>this.Myrequests = myrequests);

   this.userService.getCurrentUser()
   .subscribe(currentus=>this.CurrentUser = currentus);
  }
  ngOnDestroy(){
  }

  deleteRequest(id:any){
    this.requestService.deleteRequest(id)
      .subscribe(deleted=>this.Myrequests = deleted);
      this.NowComment = true;
  }
  
}
