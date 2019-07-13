import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() onAddIngredient = new EventEmitter<Ingredient>();

  // @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;

  @ViewChild("f", { static: false }) signupForm: NgForm;
  editMode = false;

  element = {
    name: "asd",
    amount: 1
  };

  ingredient: Ingredient;
  subscription:Subscription;
  index: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.ingredient = this.shoppingListService.getIngredient(index);
        this.index = index;
        this.signupForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      }
    );
  }

  onAddElement(form: NgForm) {
    const newIngredient =  new Ingredient(form.value.name, form.value.amount)
    if(this.editMode){
      this.shoppingListService.editIngredient(this.index, newIngredient)
    }else{
      this.shoppingListService.addNewIngredient(newIngredient);
    }
    
  }

  onDeleteElement(){
    this.shoppingListService.deleteElement(this.index);
    this.onReset();
  }

  onReset() {
    this.signupForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
