import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { RecipeService } from "./recipes/recipe.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceHolderDirective } from "./shared/placeholder/placeholder.directive";
import { RecipesModule } from "./recipes/recipes.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    PageNotFoundComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    RecipesResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule {}
