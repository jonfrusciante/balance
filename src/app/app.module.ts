import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NAV_DROPDOWN_DIRECTIVES } from "./shared/nav-dropdown.directive";
import { BreadcrumbsComponent } from "./shared/breadcrumb.component";
import { AppRoutingModule } from "./app-routing.module";
import { SimpleLayoutComponent } from "./layouts/simple-layout.component";
import { MainLayoutComponent, MainLayoutDeclarations } from "./layouts/main-layout.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { AlertService } from "./shared/alert.service";
import { Ng2BootstrapModule } from "ng2-bootstrap";
import { ChartsModule } from "ng2-charts";
import { AngularFireModule } from "angularfire2";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

//Firebase
const config = {
  apiKey: "AIzaSyAanXC_TwWnf5aIVWLjkqHMbniPsRsJNK4",
  authDomain: "balance-c6f5d.firebaseapp.com",
  databaseURL: "https://balance-c6f5d.firebaseio.com",
  storageBucket: "balance-c6f5d.appspot.com",
  messagingSenderId: "592497938758"
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2BootstrapModule,
    NgbModule.forRoot(),
    ChartsModule,
    Ng2BootstrapModule,
    NgbModule,

    // Firebase
    AngularFireModule.initializeApp(config)
  ],
  declarations: [
    AppComponent,
    SimpleLayoutComponent,
    MainLayoutComponent,
    MainLayoutDeclarations,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
