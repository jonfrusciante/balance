import { NgModule }                 from '@angular/core';
import { ChartsModule }             from 'ng2-charts/ng2-charts';

import { DashboardComponent }       from './dashboard.component';
import { DashboardRoutingModule }   from './dashboard-routing.module';
import { CommonModule } from "@angular/common";
import { InternacaoService } from "../shared/internacao.service";
import { PatientService } from "../shared/patient.service";
import { ToasterService } from "angular2-toaster";
import { MomentModule } from "angular2-moment";
import { InternacaoListComponent } from "../internacao/internacao-list/internacao-list.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    MomentModule
  ],
  declarations: [DashboardComponent, InternacaoListComponent],
  providers: [
    InternacaoService, PatientService, ToasterService
  ]
})
export class DashboardModule {
}
