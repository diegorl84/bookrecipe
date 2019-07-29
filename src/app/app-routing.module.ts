import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: RecipeStartComponent
      },
      {
        path: "new",
        component: RecipeEditComponent
      },
      {
        path: ":index",
        component: RecipeDetailComponent,
        resolve: {
          recipes: RecipesResolverService
        }
      },
      {
        path: ":index/edit",
        component: RecipeEditComponent,
        resolve: {
          recipes: RecipesResolverService
        }
      }
    ]
  },
  { path: "auth", component: AuthComponent },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
