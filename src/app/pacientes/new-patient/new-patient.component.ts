import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Http } from "@angular/http";
import { Subscription, Observable } from "rxjs";
import { ufs } from "../../shared/estados"
import { PatientService } from "../../shared/patient.service";
import { Router } from "@angular/router";
import {
  ToasterModule,
  ToasterService,
  ToasterConfig
}    from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html'
})
export class NewPatientComponent implements OnDestroy {

  private myForm;
  public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public celMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public dateMask = [/[0-3]/, /[0-9]/, '/', /[0-3]/, /[0-9]/, /\d/, /\d/, /\d/, /\d/];
  public ufs = ufs;

  public model;
  public defaults = {
    defaultUf: 'ES'
  };

  public racas = ['Branca', 'Preta', 'Amarela', 'Parda', 'Indígena'];
  public genders = ['Masculino', 'Feminino'];
  private adressFieldSubscription: Subscription;
  private viaCepSubscription: Subscription;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private _fb: FormBuilder,
              private http: Http,
              private patientService: PatientService,
              private router: Router,
              private toasterService: ToasterService) {

    this.myForm = this._fb.group({
      'name': this._fb.control('', Validators.required),
      'birth': this._fb.control('', Validators.required),
      'gender': this._fb.control('', Validators.required),
      'raca': this._fb.control(''),
      'cpf': this._fb.control(''),
      'rg': this._fb.group({
        'number': this._fb.control(''),
        'orgao': this._fb.control(''),
        'uf': this._fb.control('')
      }),
      'mother': this._fb.control(''),
      'father': this._fb.control(''),
      'naturalidade': this._fb.control(''),
      'addresses': this._fb.array([
        this.initAddress(),
      ]),
      'cont_telefone': this._fb.control('')
    });

    // const cep = this.myForm.controls['addr_cep'];
    // this.adressFieldSubscription = cep.valueChanges
    //   .filter(x => x.length == 8)
    //   .debounceTime(400)
    //   .subscribe(newValue =>
    //     this.getAdressFromCep(newValue)
    //   )
  }

  initAddress() {
    const address = this._fb.group({
      'tipo': this._fb.control(''),
      'cep': this._fb.control('', Validators.minLength(8)),
      'uf': this._fb.control(''),
      'logradouro': this._fb.control(''),
      'numero': this._fb.control(''),
      'complemento': this._fb.control(''),
      'bairro': this._fb.control(''),
      'localidade': this._fb.control('')
    });
    address.controls['cep'].valueChanges
      .filter(x => x.length == 8)
      .subscribe(newCep => {
        this.http.get('http://viacep.com.br/ws/' + newCep + '/json/')
          .map(response => response.json())
          .subscribe(res => {
            address.controls['logradouro'].setValue(res.logradouro);
            address.controls['bairro'].setValue(res.bairro);
            address.controls['localidade'].setValue(res.localidade);
            address.controls['uf'].setValue(res.uf);
          });
      })
    return address;
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.push(this.initAddress());

  }

  removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  register() {
    if (this.myForm.valid) {
      const p = this.cleanUpForm(this.myForm.value, true);
      let birth = new Date(p.birth.year, p.birth.month, p.birth.day);
      delete p.birth;
      p.birth = birth.getTime();
      this.patientService.addPatient(p)
        .then((patient) => {
          this.toasterService.pop('success', 'Paciente criado com sucesso', patient.name);
        });
    }
  }

  ngOnDestroy(): void {
  }

  private cleanUpForm(test, recurse) {
    for (let i in test) {
      if (test[i] === "") {
        delete test[i];
      } else if (recurse && typeof test[i] === 'object') {
        this.cleanUpForm(test[i], recurse);
      }
    }
    return test;
  }
}
