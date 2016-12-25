import { Component } from '@angular/core';
import { AuthService } from "./auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthMethods } from "angularfire2";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private myForm;

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    this.myForm = fb.group({
      'email': fb.control('', Validators.required),
      'password': fb.control('', Validators.required)
    });

  }

  login() {
    this.authService.loginWithPassword(this.myForm.value)
      .then(
        (success) => {
          console.log(success);
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        })
      .catch((err) => console.log(err))
  }

  loginWithSocial(provider: number) {
    this.authService.login({
      method: AuthMethods.Popup,
      provider: provider
    });
  }
}
