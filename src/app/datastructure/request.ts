import {user} from './user';

export interface request {
    _id:string,
    type:string,
    familySituation:string,
    subject:string,
    dueDate: Date,
    loading:boolean,
    reqResponded:boolean,
    urgent:boolean,
    user:user,
    helps:user[]
}