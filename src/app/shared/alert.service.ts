import { Injectable } from '@angular/core';
import { Alert } from "../models/alert";

@Injectable()
export class AlertService {

  _alerts: Array<Alert> = new Array<Alert>();

  constructor() {
  }

  emitAlert(alert: Alert) {
    this._alerts.unshift(alert);
  }

  get alerts() {
    return this._alerts
  }

}
