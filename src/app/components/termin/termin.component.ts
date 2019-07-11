import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.scss']
})
export class TerminComponent implements OnInit {
  time: string;
  date: Date;

  constructor() {
  }

  ngOnInit() {
  }

  logTime() {
    console.log(this.date);
  }
}
