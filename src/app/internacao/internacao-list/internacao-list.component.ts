import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { InternacaoService } from "../../shared/internacao.service";
import { PatientService } from "../../shared/patient.service";
import { Subject } from "rxjs";
import * as moment from "moment";
import 'moment/min/locales';
import { FormBuilder } from "@angular/forms";
import { Leito } from "../../models/interface";
moment.locale('pt-br');

@Component({
  selector: 'app-main-list',
  templateUrl: './internacao-list.component.html'
})
export class InternacaoListComponent implements OnInit, OnDestroy {

  @Input() status: string = "occupped";

  private myForm;
  private leitos;
  private listSubscription;
  private statusFilter = new Subject<string>();

  fields = [
    this.newField("Leito", true),
    this.newField("Nome do Paciente", false),
    this.newField("Idade", true),
    this.newField("Especialidade", false),
    this.newField("Atividade", true),
  ];

  constructor(private router: Router,
              private is: InternacaoService,
              private ps: PatientService,
              fb: FormBuilder) {

    this.myForm = fb.group({
      'search': fb.control(''),
      'filter': fb.control('')
    });

    this.myForm.controls['filter'].valueChanges
      .subscribe(status => {
        this.status = status;
        this.statusFilter.next(status);
      });

  }

  private newField(label: string, center: boolean) {
    return {
      label: label,
      center: center
    }
  }

  ngOnInit(): void {
    this.listSubscription = this.is.getLeitosByStatus(this.statusFilter)
      .subscribe(list => {
        console.log(list);
        list.forEach(leito => {
          if (leito.status == 'occupped') {
            leito.patient = this.ps.getPatient(leito.pid);
            leito.when = moment(leito.internation, 'x').format('DD/MM/YYYY HH:mm:ss');
            leito.data = this.is.getInternacao(leito.internation);
            console.log(leito);
          }
        });
        this.leitos = list;
      });

    //trigger default filters;
    this.statusFilter.next(this.status);
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  goPatient(id: string) {
    this.router.navigate(['/pacientes/p', id]);
  }

  newInternation() {
    this.router.navigate(['/pacientes/internacao']);
    return false;
  }
}
