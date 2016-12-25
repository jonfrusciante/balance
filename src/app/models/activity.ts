import * as moment from 'moment/moment';
import { Observable } from "rxjs";

export class Activity {

  event: number;
  when: number;

  constructor(event: number, when: number) {
    this.event = event;
    this.when = when;
  }

  getMessage(): string {
    return 'A paciente realizou hemodiálise';
  }

  getIcon(): string {
    return 'img/a4.jpg';
  }

  getTitle(): string {
    return 'Intercorrência';
  }

}
