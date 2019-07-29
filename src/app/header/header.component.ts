import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthResposeData, AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }


  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
