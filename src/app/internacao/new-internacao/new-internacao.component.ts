import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {InternacaoService} from "../../shared/internacao.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../shared/patient.service";
import {Observable} from "rxjs";
import * as moment from "moment";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-new-internacao',
  templateUrl: './new-internacao.component.html',
})
export class NewInternationComponent implements OnInit {

  private myForm;
  private leitos;
  private patient;
  private patient_id;
  private convenios;
  private especialidades;

  private procedencia = [
    "Centro Cirúrgico",
    "Clínica Ortopédica",
    "Clínica Cirurgica",
    "Clínica Médica",
    "Externo",
    "GO - Maternidade",
    "Hemodinâmica",
    "PS",
    "Semi"];

  tipos = [
    "Eletivo",
    "Cirúrgico Urgência",
    "Clínico",
    "Coronariano",
    "Sem indicação"
  ];

  formatter = (x: {name: string}) => x.name;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .filter(term => term.length > 1)
      .switchMap(term => this.ps.patientSearchByName(term));

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private ps: PatientService,
              private router: Router,
              private is: InternacaoService,
              private af: AngularFire) {
  }

  selectPatient(event: any) {
    this.patient = event.item;
    this.patient_id = event.item.$key;
  }

  isPatientValid(): boolean {
    return (this.patient && this.patient_id);
  }

  ngOnInit(): void {
    this.route.queryParams
      .map((params: any) => params.p)
      .filter(Boolean)
      .flatMap(pid => this.ps.getPatient(pid))
      .subscribe(patient => {
        if (patient) {
          this.patient_id = patient.$key;
          this.patient = patient;
          this.myForm.controls['name'].setValue(patient.name);
          this.myForm.controls['name'].disabled(true);
        }
      });

    this.leitos = this.is.getLeitosByStatus('livre');
    this.convenios = this.is.getConvenios();
    this.especialidades = this.is.getSpecs();

    this.myForm = this.fb.group({
      'name': this.fb.control({value: '', disabled: false}),
      'leito': this.fb.control('', Validators.required, this.isLeitoOccupped(this.is)),
      'convenio': this.fb.control(''),
      'tipo': this.fb.control(''),
      'especialidade': this.fb.control(''),
      'procedencia': this.fb.control(''),
      'when': this.fb.control('')
    });
  }

  isLeitoOccupped(service: InternacaoService) {
    return function (control: FormControl) {
      return new Promise((resolve, reject) => {
        service.getLeito(control.value)
          .subscribe(data => {
              if (data.status === 'occupped') {
                resolve({occupped: true});
              } else {
                resolve(null);
              }
            },
            err => resolve({occupped: true})
          )
      });
    }
  }

  internar() {
    let values = this.myForm.value;
    console.log(values);
    let internationId = moment().valueOf();
    const obj = this.af.database.object('/internacoes/' + internationId);
    obj.set({
      "convenio": values.convenio,
      "especialidade": values.especialidade,
      "procedencia": values.procedencia,
      "pid": this.patient_id,
      "tipo": values.tipo,
    });
    const leito = this.af.database.object('/leitos/' + values.leito);
    leito.set({
      pid: this.patient_id,
      status: "occupped",
      internation: internationId
    }).then(x => this.router.navigate(['/dashboard']));
  }
}
