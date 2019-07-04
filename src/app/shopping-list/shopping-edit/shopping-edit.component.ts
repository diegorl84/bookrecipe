import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() onAddIngredient = new EventEmitter<Ingredient>();

  @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  addIngredient() {
    this.onAddIngredient.emit(
      new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value));
  }
}
