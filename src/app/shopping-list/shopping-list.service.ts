import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService{
    hasChange = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addNewIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.hasChange.emit(this.ingredients.slice());
    }

    addIngredents(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addNewIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.hasChange.emit(this.ingredients.slice())
    }
}