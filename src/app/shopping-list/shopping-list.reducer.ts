import { Ingredient } from "../shared/ingredient.model";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Onios', 5),
        new Ingredient('Bread', 3)
      ]
};

export function shoppingListReducer(state = initialState, action){

}