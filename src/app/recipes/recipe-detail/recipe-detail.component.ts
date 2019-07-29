import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  @Input()  index: number;

  constructor(private recipeService : RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipeByIndex(+params['index']);
      }
    )
  }
  
  addToShopppingList(){
    this.recipeService.addIngredientsToShoppignList(this.recipe.ingredients); 
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/']);
  }
}
