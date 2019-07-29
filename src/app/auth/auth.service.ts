import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResposeData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient){}

  signUp(email: string, password: string) {
    return this.http.post<AuthResposeData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzZcAT4M9F-2aP1xRHl-FijClCRKikxz4",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorResponse => {

        let errorMessage = "An unknown error occurred";

        if(!errorResponse.error || !errorResponse.error.error){
          return throwError(errorResponse);
        }
        switch(errorResponse.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        }
        return throwError(errorMessage);
      })
    );
  }

  login() {}

  errorHandle(){
    
  }
}
