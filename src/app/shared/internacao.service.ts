import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Subject } from "rxjs";
import { Internacao } from "../models/interface";

@Injectable()
export class InternacaoService {

  constructor(private af: AngularFire) {


  }

  getAf() {
    return this.af;
  }

  getLeitosByStatus(status: Subject<string> | string) {
    return this.af.database.list('/leitos', {
      query: {
        orderByChild: 'status',
        equalTo: status
      }
    });
  }

  getAllLeitos() {
    return this.af.database.list('/leitos');
  }

  getLeito(index: number) {
    return this.af.database.object('/leitos/' + index);
  }

  getInternacao(internationId: string) {
    return this.af.database.object('/internacoes/' + internationId);
  }

  getPatientInternations(pid: string | Subject<string>) {
    return this.af.database.list('/internacoes', {
      query: {
        orderByChild: "pid",
        equalTo: pid
      }
    });
  }

  getConvenios() {
    return this.af.database.list('/planos');
  }

  getSpecs() {
    return this.af.database.list('/especialidades');
  }

  generateLeitos() {
    const obj = this.af.database.object('/leitos');
    let temp = {  };
    for (let i = 1; i<= 10; i++) {
      temp[i] = {status: "livre"};
    }
    obj.set(temp);
  }
}
