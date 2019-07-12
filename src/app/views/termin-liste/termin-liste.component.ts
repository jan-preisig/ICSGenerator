import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TerminService} from '../../services/termin.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Termin} from '../../models/Termin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-termin-liste',
  templateUrl: './termin-liste.component.html',
  styleUrls: ['./termin-liste.component.scss']
})
export class TerminListeComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['title', 'description', 'location', 'startDate', 'startTime', 'endDate', 'endTime', 'delete'];
  public dataSource = new MatTableDataSource<Termin>([]);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private terminService: TerminService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Termin>(this.terminService.getTermine());
  }

  ngAfterViewInit(): void {

  }

  public deleteTerminByUid(uid: string) {
    this.terminService.deleteByUid(uid);
    this.dataSource = new MatTableDataSource<Termin>(this.terminService.getTermine());
  }

}
