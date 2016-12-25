import 'rxjs/add/operator/switchMap';

import { Component } from '@angular/core';
import { PatientService } from "../../shared/patient.service";
import { AlertService } from "../../shared/alert.service";
import { Router } from "@angular/router";
import { Patient } from "../../models/patient";

@Component({
  templateUrl: './patient-list.component.html'
})
export class PatientListComponent {

  public filterQuery = '';
  private patientList: Patient[] = [];

  loadingState: any;

  constructor(private patientService: PatientService,
              private alertService: AlertService,
              private router: Router) {

    this.setLoadingState(true, 'Carregando lista de pacientes...');
    this.patientService.getAllPatients()
      .subscribe(data => {
          this.setLoadingState(false);
          this.patientList = data;
        },
        error => this.setLoadingState(true, 'Error' + error),
        () => this.setLoadingState(false)
      );

  }

  setLoadingState(loading: boolean, msg?: string) {
    this.loadingState = {
      loading: loading,
      msg: msg
    }
  }

  testAlert() {
    let d = new Date();
    this.alertService.emitAlert({ when: d.getTime(), seen: false, icon: 'fa-bell-o', message: 'de Outro componente' });
  }

  goToPatient(patient) {
    this.router.navigate(['/pacientes/p', patient.$key]);
  }

  newPatient() {
    this.router.navigate(['/pacientes/novo']);
  }

}
