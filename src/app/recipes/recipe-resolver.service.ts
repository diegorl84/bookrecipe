import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";
import { Injectable } from "@angular/core";

interface Recipe{
    name: string;
    img: string;
    description: string;
}

@Injectable()
export class RecipeResolver implements Resolve<Recipe>{
    constructor(private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return this.recipeService.getRecipeByIndex(+route.params['index']);  
    }
    
}