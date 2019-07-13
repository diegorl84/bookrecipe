import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    hasChange = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Onios', 5),
        new Ingredient('Bread', 3),
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addNewIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.hasChange.next(this.ingredients.slice());
    }

    addIngredents(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.hasChange.next(this.ingredients.slice())
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    editIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index] = ingredient;
        this.hasChange.next(this.ingredients.slice());
    }

    deleteElement(index:number){
        this.ingredients.splice(index,1);
        this.hasChange.next(this.ingredients.slice());
    }
}