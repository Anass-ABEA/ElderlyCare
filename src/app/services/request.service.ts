import { Injectable } from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {map , catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {request} from '../datastructure/request';
import { baseURL } from '../baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient, private httperrorHandler:ProcessHTTPMsgService) { }


  getNormalRequests(): Observable<request[]>{
    return this.http.get<request[]>(baseURL + 'requests?urgent=false')
    .pipe(catchError(this.httperrorHandler.handleError))
  }
  getUrgentRequests(): Observable<request[]>{
    return this.http.get<request[]>(baseURL + 'requests?urgent=true')
    .pipe(catchError(this.httperrorHandler.handleError))
  }
  getMyRequests(): Observable<request[]>{
    return this.http.get<request[]>(baseURL + 'requests/myRequests')
    .pipe(catchError(this.httperrorHandler.handleError))
  }
  postRequest(request:any): Observable<any> {
    return this.http.post<request>(baseURL + 'requests', {'type':request.type, 'familySituation':request.familySituation, 'subject':request.subject,
    'loading':request.loading,'urgent':request.urgent,'reqResponded':request.reqResponded,'dueDate':request.dueDate})
    .pipe(map(res=>{
      console.log(res);
      return{'succes':true , 'message' :'request Posted'};
    }))
  }
  
  putRequest(id:any): Observable<any>{
    return this.http.put(baseURL + 'requests/'+id , {loading:true})
    .pipe(catchError(error => this.httperrorHandler.handleError(error)));
  }
  
  deleteRequest(id:any) : Observable<any>{
    return this.http.delete(baseURL + 'requests/' +id)
    .pipe(catchError(error => this.httperrorHandler.handleError(error)));
  }
}
