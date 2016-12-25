import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { PatientService } from "../../shared/patient.service";
import 'rxjs/add/operator/switchMap';
import { Observable } from "rxjs";
import { Patient } from "../../models/patient";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  patient: Observable<Patient>;
  private patient_id;

  constructor(private ps: PatientService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.patient = this.route.params.switchMap((params: Params) => {
      this.patient_id = params['id'];
      return this.ps.getPatient(this.patient_id);
    });
  }
}
