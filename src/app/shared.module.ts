import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    RoleCheckDirective, HasOnePermissionDirective, HasAllPermissionsDirective,
    ExceptPermissionsDirective, ExceptRolesDirective
} from './directives/permissions/index';
import {
    AuthenticationService, PermissionService,
    UsersService, OptionService, RoleService
} from './services/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {
    MatButtonModule, MatTooltipModule, MatIconModule, MatFormFieldModule, MatCheckboxModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatSortModule, MatPaginatorModule
} from '@angular/material';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [
        CommonModule,

        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatIconModule,

        NgxEditorModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        RoleCheckDirective,
        HasOnePermissionDirective,
        HasAllPermissionsDirective,
        ExceptPermissionsDirective,
        ExceptRolesDirective,

    ],
    exports: [
        RoleCheckDirective,
        HasOnePermissionDirective,
        HasAllPermissionsDirective,
        ExceptPermissionsDirective,
        ExceptRolesDirective,
        CommonModule,

        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatIconModule,

        TooltipModule,
        NgxEditorModule,
    ],
    providers: [
        AuthenticationService,
        UsersService,
        // OptionService,
        //        {provide: ToastOptions, useClass: CustomOption}
    ]
})
export class SharedCustomModule { }
