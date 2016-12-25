import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html'
})
export class PatientSearchDialog implements OnInit {

  @ViewChild('contentDialog') contentDialog;

  subject = new Subject<String>();

  constructor(private modalService: NgbModal) {

  }

  open() {
    this.modalService.open(this.contentDialog, { backdrop: 'static' })
      .result
      .then((result) => this.subject.next('temp'));
  }

  init(): Observable<String> {
    return this.subject.asObservable();
  }

  ngOnInit() {
  }

}
