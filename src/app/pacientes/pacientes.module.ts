import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { PatientListComponent } from './patient-list/patient-list.component';
import { DataFilterPipe } from "./patient-list/datafilterpipe";
import { PacientesRoutingModule } from "./pacientes-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { PatientService } from "../shared/patient.service";
import { NewPatientComponent } from './new-patient/new-patient.component';
import { TextMaskModule } from "angular2-text-mask";
import { Ng2BootstrapModule, DropdownModule } from "ng2-bootstrap";
import { NgbModule, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateMomentParserFormatter } from "../shared/date-formatter";
import { ProfileComponent } from './profile/profile.component';
import { ToasterService, ToasterModule } from "angular2-toaster";
import { TimelineComponent } from './timeline/timeline.component';
import { DetailsComponent } from './profile/details.component';
import { ActivityComponent } from './timeline/activity.component';
import { MomentModule } from "angular2-moment";
import { NewInternationComponent } from "../internacao/new-internacao/new-internacao.component";
import { InternacaoService } from "../shared/internacao.service";
import { PatientSearchDialog } from "../dialogs/patient-search/patient-search.component";
import { VitalsWidgetComponent } from './profile/vitals-widget/vitals-widget.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    PacientesRoutingModule,
    DataTableModule,
    TextMaskModule,
    Ng2BootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    DropdownModule,
    ToasterModule,
    ChartsModule,
    HttpModule,
    MomentModule
  ],
  declarations: [
    PatientListComponent,
    NewPatientComponent,
    DataFilterPipe,
    NewInternationComponent,
    PatientSearchDialog,
    ProfileComponent,
    TimelineComponent,
    DetailsComponent,
    ActivityComponent,
    VitalsWidgetComponent
  ],
  providers: [
    PatientService, {
      provide: NgbDateParserFormatter,
      useFactory: loadParseFormatter
    },
    ToasterService,
    InternacaoService
  ]
})
export class PacientesModule {
}

export function loadParseFormatter() {
  return new NgbDateMomentParserFormatter()
}

