import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})
export class AuthComponent {
  isLogingMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLogingMode = !this.isLogingMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogingMode) {
    } else {
      this.authService.signUp(email, password).subscribe(
        data => {
          console.log(data);
          this.isLoading = false;
        },
        errorMessage => {
          console.log(errorMessage);
          this.errorMessage = errorMessage;
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }

  
}
