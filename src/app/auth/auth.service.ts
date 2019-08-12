import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

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
  // user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResposeData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebaseKey,
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.firebaseKey,
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

  autoLogin() {
    //JSON.parse convert a string into a java object
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.store.dispatch(
        new AuthActions.Login({
          email: loadedUser.email,
          id: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(["/auth"]);
  }

  autoLogout(experationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, experationDuration);
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
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.Login({
        email: email,
        id: id,
        token: token,
        expirationDate: expirationDate
      })
    );
    this.autoLogout(expiresIn * 1000);
    //JSON.stringify convert a java object into a string
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
