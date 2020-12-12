import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg-service.service';
interface AuthResponse {
  status: string;
  success: string;
  token: string;
  inNeed: boolean;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}
interface Signupresponse{
  succes:boolean;
  status:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey = 'JWT';
  isAuthenticated: boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  IsAuthenticatedInNeed: boolean = false;
   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHTTPMsgService) {
   }

   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
     });
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

   clearUsername() {
     this.username.next(undefined);
   }

   loadUserCredentials() {
     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
       this.useCredentials(credentials);
       if (this.authToken) {
        this.checkJWTtoken();
       }
     }
   }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.authToken = credentials.token;
     this.IsAuthenticatedInNeed = credentials.inNeed;
   }

   destroyUserCredentials() {
     this.authToken = undefined;
     this.clearUsername();
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
   }

  signUp(user:any) : Observable<any> {
    return this.http.post<Signupresponse>(baseURL +'users/signup' , 
    {'username':user.username, 'password':user.password, 'firstname':user.firstname,'lastname':user.lastname,
     'inNeed':user.inNeed,'mail':user.mail,'telNumber':user.telNumber})
    .pipe(map(res=>{
      console.log(res);
      return{'succes':true , 'message' :'registration done'};
    }))
   }

   logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login',
      {'username': user.username, 'password': user.password})
      .pipe( map(res => {
          if(res.inNeed){
            console.log("In Need" );
          }
          else{
            console.log("Not in need");
          }
          this.storeUserCredentials({username: user.username, token: res.token,inNeed:res.inNeed});
          return {'success': true, 'username': user.username };
      }),
       catchError(error => this.processHTTPMsgService.handleError(error)));
  }

   logOut() {
     this.destroyUserCredentials();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): Observable<string> {
     return this.username.asObservable();
   }

   getToken(): string {
     return this.authToken;
   }
   getInNeed():boolean{
     return this.IsAuthenticatedInNeed;
   }
}
