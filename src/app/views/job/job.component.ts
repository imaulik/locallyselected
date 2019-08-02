import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UsersService, LoaderService } from './../../services/index';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, Sort } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
    templateUrl: 'job.component.html',
})
export class JobComponent implements OnInit {
    public loading = false;
    dataSource;
    dtInstance: any = {};
    User_id;
    pageEvent: PageEvent;
    sorts: Sort;
    displayedColumns: string[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() page: EventEmitter<PageEvent>;
    @Output() sortChange: EventEmitter<Sort>;

    constructor(private loaderService: LoaderService, private router: Router, public _http: HttpClient, public usersService: UsersService) {
        const AuthUser = JSON.parse(localStorage.getItem('currentUser'));
        this.User_id = AuthUser;
        this.dtInstance.columns = 'id';
        this.dtInstance.sortype = 'desc';
        this.dtInstance.pageIndex = 0;
        this.dtInstance.first = 0;
        this.dtInstance.rows = 10;
        this.dtInstance.globalFilter = '';
        this.loadDatas(this.dtInstance);
    }

    ngOnInit() {

    }

    loadDatas(dtInstance) {
        this.loaderService.display(true);
        this.usersService.getAllJobDT(dtInstance).subscribe(response => {
            if (response.success) {
                this.dataSource = response.data['data'];
                this.displayedColumns = ['title', 'area'];
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


    openDeleteDialog(id) {
        Swal({
            title: 'Are you sure?',
            text: 'Do you want to delete user?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.deleteUser(id);
                Swal(
                    'Deleted!',
                    'Your user has been deleted.',
                    'success'
                );
            }
        });
    }
    deleteUser(id) {
        this.loaderService.display(true);
        this.usersService.deleteUser(id).subscribe(response => {
            this.loadDatas(this.dtInstance);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
    }


    changeUserStatus(id, status) {
        this.loaderService.display(true);
        this.usersService.changeUserStatus(id, status).subscribe(response => {
            this.loadDatas(this.dtInstance);
            this.loaderService.display(false);
        }, error => {
            this.loaderService.display(false);
        });
    }
}
