import { Injectable } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from "angularfire2";
import { Router } from "@angular/router";
import { EmailPasswordCredentials } from "angularfire2/auth";
import { User } from "../models/interface";

@Injectable()
export class AuthService {

  constructor(private af: AngularFire, private router: Router) {

  }

  getUser() {
    return this.af.auth.map(user => AuthService.parseUserInfo(user));
  }

  getAuth() {
    return this.af.auth;
  }

  private static parseUserInfo(user: any) {
    const newUser: User = {
      email: user.auth.email,
      provider: user.provider
    };
    switch (user.provider) {
      case 3:
        newUser.name = user.google.displayName;
        newUser.photoURL = user.google.photoURL;
        newUser.providerId = user.google.providerId;
        newUser.providerUid = user.google.uid;
    }
    return newUser;
  }

  //LOGIN METHODS

  loginWithPassword(credentials: EmailPasswordCredentials) {
    return this.af.auth.login(credentials, {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    });
  }

  login(config: any) {
    return this.af.auth.login(config)
      .then(
        (success) => {
          console.log(success);
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        })
      .catch((err) => console.log(err))
  }

  createUser(email: string, password: string) {
    this.af.auth.createUser({ email: email, password: password });
  }

  logout() {
    return this.af.auth.logout();

  }

}
