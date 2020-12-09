import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { baseURL } from '../baseurl';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';
import {catchError} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient, private httperrorHandler : ProcessHTTPMsgService) { }


  getCurrentUser():Observable<any>{
    return this.http.get<any>(baseURL + 'users/currentUser')
    .pipe(catchError(this.httperrorHandler.handleError))
  }
  
}
