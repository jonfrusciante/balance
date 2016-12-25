import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "./common/header.component";
import {
  SidebarComponent, SidebarToggleDirective, SidebarOffCanvasCloseDirective,
  MobileSidebarToggleDirective
} from "./common/sidebar.component";
import { FooterComponent } from "./common/footer.component";
import { AsideComponent, AsideToggleDirective } from "./common/aside.component";
import { AlertsDropComponent } from "./common/alerts-drop.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor() {
  }

  public disabled: boolean = false;
  public status: {isopen: boolean} = { isopen: false };

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}

export const MainLayoutDeclarations = [
  SidebarComponent, SidebarToggleDirective, SidebarOffCanvasCloseDirective, MobileSidebarToggleDirective,
  HeaderComponent, AlertsDropComponent,
  AsideComponent, AsideToggleDirective,
  FooterComponent
];
