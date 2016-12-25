import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { User } from "../../models/interface";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private user: User;
  private usersub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.usersub = this.authService.getUser()
      .subscribe(
        user => this.user = user
      )
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
