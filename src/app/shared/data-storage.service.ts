import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put(
        "https://ng-complete-guide-2c30e.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>("https://ng-complete-guide-2c30e.firebaseio.com/recipes.json")
      .subscribe(response => {
        this.recipesService.setRecipes(response);
      });
  }
}
