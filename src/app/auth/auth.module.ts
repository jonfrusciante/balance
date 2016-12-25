import { NgModule } from '@angular/core';
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, AuthRoutingModule,
    ReactiveFormsModule],
  declarations: [
    LoginComponent,
  ]
})
export class AuthModule {
}
