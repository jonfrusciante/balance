import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../shared/alert.service";
import { Alert } from "../../models/alert";

@Component({
  selector: 'app-alerts-drop',
  templateUrl: './alerts-drop.component.html'
})
export class AlertsDropComponent implements OnInit {

  public disabled: boolean = false;
  public defaultStyle: string = 'tag-danger';
  public defaultIcon: string = 'bell-o';
  public status: { isopen: boolean } = { isopen: false };

  private alerts: Alert[];

  constructor(private alertService: AlertService) {
    this.alerts = this.alertService.alerts;
  }

  ngOnInit() {

  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public doAction(alert: Alert) {

  }

}
