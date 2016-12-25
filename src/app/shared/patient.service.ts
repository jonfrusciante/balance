  import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Patient } from "../models/patient";
import { ToasterService } from "angular2-toaster";
import { Subject, Observable } from "rxjs";
import { Query } from "angularfire2/interfaces";

@Injectable()
export class PatientService {

  constructor(private af: AngularFire, private toasterService: ToasterService) {

  }

  addPatient(patient: Patient) {
    const itemObservable = this.af.database.list('/patients');
    return itemObservable.push(patient);
  }

  //Retriving patients
  getAllPatients() {
    return this.af.database.list('/patients', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  getPatient(id: string): FirebaseObjectObservable<Patient> {
    return this.af.database.object('/patients/' + id);
  }

  patientSearchByName(name: Observable<any> | string) {
    return this.af.database.list('/patients', {
      query: {
        orderByChild: "name",
        startAt: name,
        limitToLast: 10
      }
    });
  }

  customListQuery(query: Query) {
    return this.af.database.list('/patients', query);
  }

}
