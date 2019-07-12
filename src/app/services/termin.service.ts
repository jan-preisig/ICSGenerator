import {Injectable, OnInit} from '@angular/core';
import {Termin} from '../models/Termin';

@Injectable({
  providedIn: 'root'
})
export class TerminService implements OnInit {
  private termine: Termin[];

  constructor() {
    // this.clearAllTermine();
    if (localStorage.getItem('termine') != null) {
      this.termine = JSON.parse(localStorage.getItem('termine'));
    } else {
      this.termine = [];
    }
  }

  ngOnInit(): void {
  }

  public addTermin(termin: Termin) {
    this.termine.push(termin);
    localStorage.setItem('termine', JSON.stringify(this.termine));
  }

  public getTermine(): Termin[] {
    return this.termine;
  }

  public clearAllTermine() {
    localStorage.removeItem('termine');
    this.termine = [];
  }

  public deleteByUid(uid: string) {
    this.termine = this.termine.filter(termin => termin.uid !== uid);
    localStorage.setItem('termine', JSON.stringify(this.termine));
  }
}
