import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }
  
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription =  this.shoppingListService.hasChange.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        }
      );
  }

  editItem(index: number){
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
