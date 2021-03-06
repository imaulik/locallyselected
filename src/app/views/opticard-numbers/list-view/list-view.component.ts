import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { LoaderService, OpticardService } from '../../../services/index';
import { Router } from '@angular/router';


@Component({
  templateUrl: './list-view.component.html',
  styleUrls: ['./../opticard-number.module.scss']
})

export class OpticardNumbersListViewComponent implements OnInit {
  public loading = false;
  dataSource;
  dtInstance: any = {};
  pageEvent: PageEvent;
  sorts: Sort;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() page: EventEmitter<PageEvent>;
  @Output() sortChange: EventEmitter<Sort>;

  constructor(private loaderService: LoaderService, private opticardService: OpticardService,
    private router: Router, public _http: HttpClient) {
    this.dtInstance.columns = 'available';
    this.dtInstance.sortype = 'desc';
    this.dtInstance.pageIndex = 0;
    this.dtInstance.first = 0;
    this.dtInstance.rows = 10;
    this.dtInstance.globalFilter = '';
    this.loadDatas(this.dtInstance);
  }

  ngOnInit() { }

  loadDatas(dtInstance) {
    this.loaderService.display(true);
    this.opticardService.getOpticards(dtInstance).subscribe(response => {
      if (response.success) {
        this.dataSource = response.data['data'];
        this.displayedColumns = ['number', 'available'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator.length = response.data['totalrecords'];
        this.dataSource.paginator.pageIndex = this.dtInstance.pageIndex;
        this.dataSource.paginator.pageSize = this.dtInstance.rows;
        this.loaderService.display(false);
      } else {
        this.loaderService.display(false);
      }
    });
  }

  applyFilter(event) {
    this.dtInstance.pageIndex = 0;
    this.dtInstance.first = 0;
    this.dtInstance.globalFilter = event;
    this.loadDatas(this.dtInstance);
  }
  applyPagination(event) {
    this.dtInstance.pageIndex = event.pageIndex;
    this.dtInstance.first = event.pageIndex * event.pageSize;
    this.dtInstance.rows = event.pageSize;
    this.loadDatas(this.dtInstance);
  }
  applySort(event) {
    this.dtInstance.columns = event.active;
    this.dtInstance.sortype = event.direction;
    this.loadDatas(this.dtInstance);
  }

}
