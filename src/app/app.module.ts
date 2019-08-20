import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShareModule } from "./shared/share.module";
import { CoreModule } from "./core.module";
import { LoggingService } from "./logging.service";
import * as fromApp from "./store/app.reducer";
import { AuthEffects } from "./auth/store/auth.effects";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { environment } from "../environments/environment";
import { RecipeEffects } from "./recipes/store/recipe.effects";

@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    ShareModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule {}
