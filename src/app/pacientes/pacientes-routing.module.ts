import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PatientListComponent } from "./patient-list/patient-list.component";
import { NewPatientComponent } from "./new-patient/new-patient.component";
import { ProfileComponent } from "./profile/profile.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { NewInternationComponent } from "../internacao/new-internacao/new-internacao.component";

const routes: Routes = [
  { path: '', component: PatientListComponent, pathMatch: 'full' },
  { path: 'novo', component: NewPatientComponent, data: { title: 'Novo paciente' } },
  { path: 'internacao', component: NewInternationComponent, data: { title: 'Internacao' } },
  {
    path: 'p/:id',
    component: ProfileComponent,
    children: [
      { path: '', component: TimelineComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
