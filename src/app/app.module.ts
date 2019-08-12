import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ShareModule } from "./shared/share.module";
import { CoreModule } from "./core.module";
import { LoggingService } from "./logging.service";
import { StoreModule } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    ShareModule,
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService]
})
export class AppModule {}
