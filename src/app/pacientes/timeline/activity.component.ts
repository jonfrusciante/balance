import { Component, OnInit, Input, OnDestroy, trigger, state, transition, style, animate } from '@angular/core';
import { Activity } from "../../models/activity";
import { Observable } from "rxjs";
import * as moment from 'moment/moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() activity: Activity;

  timeAgo: Observable<String> = null;

  constructor() {
    this.timeAgo = Observable.timer(0, 60 * 1000)
      .map(x => moment(this.activity.when)
        .fromNow());

  }

  ngOnInit() {

  }

}
