import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

//Layouts
import { MainLayoutComponent } from "./layouts/main-layout.component";
import { SimpleLayoutComponent } from "./layouts/simple-layout.component";
import { AuthGuard } from "./auth/auth.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: 'auth', component: SimpleLayoutComponent, data: { title: 'Auth' },
      children: [
        { path: '', loadChildren: 'app/auth/auth.module#AuthModule' }
      ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: '',
      component: MainLayoutComponent,
      data: { title: 'Home' },
      canActivate: [AuthGuard],
      children: [
        { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
        { path: 'pacientes', loadChildren: 'app/pacientes/pacientes.module#PacientesModule' },
        { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' }
      ]
    }
  ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
