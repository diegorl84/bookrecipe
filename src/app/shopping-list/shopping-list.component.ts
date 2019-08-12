import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subscription, Observable } from "rxjs";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import * as fromShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer"

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    this.loggingService.printLog("Hello from shopping-list component");
  }

  editItem(index: number) {
    this.store.dispatch(new fromShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
  }
}
