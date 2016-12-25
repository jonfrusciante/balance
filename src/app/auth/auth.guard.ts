import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';
import { Observable } from "rxjs";
import { FirebaseAuthState, FirebaseAuth } from "angularfire2";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: FirebaseAuth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) this.router.navigate(['/auth/login']);
      });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.canActivate(route, state);
  }

}
