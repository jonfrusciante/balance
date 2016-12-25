import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Activity } from "../../models/activity";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  private myForm;

  mainState: string = 'collapsed';

  activities: Activity[];

  constructor(_fb: FormBuilder) {
    this.activities = [];
    // const one = new Activity(0, 1479660887874);
    // this.activities.push(one);

    this.myForm = _fb.group({
      'maininput': _fb.control(''),
      'filter': _fb.control('')
    })
  }

  ngOnInit() {

  }

  addtoTime() {
    const two = new Activity(1, 1479660967874);
    this.activities.push(two)
  }

  setMainState(state: string) {
    this.mainState = state;
  }

}

