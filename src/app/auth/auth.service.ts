import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { User } from "./user.model";

export interface AuthResposeData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResposeData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzZcAT4M9F-2aP1xRHl-FijClCRKikxz4",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorResponse => {
          return this.errorHandle(errorResponse);
        }),
        tap(responseData => {
          this.authenticationHandle(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResposeData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzZcAT4M9F-2aP1xRHl-FijClCRKikxz4",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.errorHandle),
        tap(responseData => {
          this.authenticationHandle(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  errorHandle(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorResponse);
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "The email does not exist";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Password is invalid";
        break;
    }
    return throwError(errorMessage);
  }

  authenticationHandle(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);

    this.user.next(user);
  }
}
