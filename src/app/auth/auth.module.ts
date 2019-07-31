import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { ShareModule } from "../shared/share.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
    ShareModule
  ]
})
export class AuthModule {}
