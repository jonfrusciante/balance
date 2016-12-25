import { Component, OnInit, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html'
})
export class AsideComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

@Directive({
  selector: '.aside-toggle',
})
export class AsideToggleDirective {
  constructor() {
  }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    document.querySelector('body')
      .classList
      .toggle('aside-menu-open');
  }
}
