import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Termin} from '../../models/Termin';
import {TerminService} from '../../services/termin.service';
import {v4 as uuid} from 'uuid';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-termin',
  templateUrl: './termin.component.html',
  styleUrls: ['./termin.component.scss']
})
export class TerminComponent implements OnInit {
  public ownerForm: FormGroup;

  constructor(private location: Location, private terminService: TerminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', Validators.maxLength(100)),
      location: new FormControl('', Validators.maxLength(20)),
      startDate: new FormControl(new Date()),
      startTime: new FormControl('', Validators.required),
      endDate: new FormControl(new Date()),
      endTime: new FormControl('', Validators.required)
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
  };

  public createTermin = (terminFormValue) => {
    if (this.ownerForm.valid) {
      this.executeTerminCreation(terminFormValue);
    }
  };

  private executeTerminCreation = (terminFormValue) => {
    const termin: Termin = {
      title: terminFormValue.title,
      description: terminFormValue.description,
      location: terminFormValue.location,
      startDate: terminFormValue.startDate,
      startTime: terminFormValue.startTime,
      endDate: terminFormValue.endDate,
      endTime: terminFormValue.endTime,
      dtStamp: new Date(),
      creationDate: new Date(),
      uid: uuid()
    };
    this.terminService.addTermin(termin);
    console.log(this.terminService.getTermine());
    this.toastr.success('Termin erfolgreich hinzugefügt', 'success', {positionClass: 'toast-bottom-center'});
  };
}
