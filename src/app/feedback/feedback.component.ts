import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {FeedbackService} from '../services/feedback.service';
import {feedback} from '../datastructure/feedback'
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  rating:number = 5;
  comment:string;
  Comment:Object;
  feedbacksT: feedback[];

constructor(private feedbackService : FeedbackService) { }

  commentFormControl = new FormControl('', [
    Validators.required,
  ]);
  ngOnInit() {
    this.feedbackService.getFeedback()
    .subscribe(feedbacks => this.feedbacksT = feedbacks)
  }
  onSubmit():boolean{
    if(this.commentFormControl.hasError('required')){
      console.log('Your comment is needed');
      return false;
    }
    else{
      this.Comment = {rating:this.rating, comment:this.comment};
      this.feedbackService.postFeedback(this.Comment)
      .subscribe(feedbacks => {this.feedbacksT = feedbacks ; console.log(this.feedbacksT)})
      this.rating = 5;
      this.comment="";
      return true
    }
  }
}
