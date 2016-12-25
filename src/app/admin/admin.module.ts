import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DropdownModule } from "ng2-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ]
})
export class AdminModule {

}
