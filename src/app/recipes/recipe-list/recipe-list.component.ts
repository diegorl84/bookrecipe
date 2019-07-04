import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  
  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe', 'This is simply a test', 
  //   'https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg'),
  //   new Recipe('A Test Recipe', 'This is simply a test', 
  //   'https://www.thegreatcoursesdaily.com/wp-content/uploads/2017/08/ThinkstockPhotos-511930406.jpg'),
  //   new Recipe('Test Recipe','Description test', 
  //   'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg')
  // ];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);

  }

}
