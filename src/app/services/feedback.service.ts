import { Injectable } from '@angular/core';
import {feedback} from '../datastructure/feedback';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../baseurl';
import {Observable, pipe} from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';
import {  catchError, } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private httperrorHandler:ProcessHTTPMsgService) { }


  getFeedback() : Observable<feedback[]>{
    return this.http.get<feedback[]>(baseURL + 'feedbacks')
    .pipe(catchError(this.httperrorHandler.handleError))
  }

  postFeedback(feedback:any) : Observable<any>{
    return this.http.post<any>(baseURL+'feedbacks',{'rating' : feedback.rating, 'comment': feedback.comment})
  }
}
