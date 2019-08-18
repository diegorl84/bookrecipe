import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthResposeData, AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select("auth")
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !user ? false : true;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
