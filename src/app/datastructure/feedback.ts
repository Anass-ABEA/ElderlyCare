import {user} from './user';


export interface feedback{
    _id:string,
    rating:number,
    comment:string,
    createdAt:Date,
    user:user
}

