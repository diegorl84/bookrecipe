import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Burger', 'This is simply a test', 
            'https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg',
            [
                new Ingredient('Buns',2),
                new Ingredient('Meat',1)
            ]),
        new Recipe(
            'Salad', 'This is simply a test', 
            'https://www.thegreatcoursesdaily.com/wp-content/uploads/2017/08/ThinkstockPhotos-511930406.jpg',
            [
                new Ingredient('Meat',1),
                new Ingredient('Fries', 20)
            ]),
        
        new Recipe(
            'Steak','Description test', 
            'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Tomato', 1)
            ])
      ];

    constructor(private shoppingListService : ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppignList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredents(ingredients);

    }

}