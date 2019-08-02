import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit.component';
import { UserViewComponent } from './user-view.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AppConstants } from '../../constants/app.constants';
import { SharedCustomModule } from '../../shared.module';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: AppConstants.SITE_URL + 'upload/uploadImages',
    maxFiles: 2,
    maxFilesize: 50,
    acceptedFiles: '.png, .jpg, .jpeg',
    addRemoveLinks: true,
    createImageThumbnails: true,
    withCredentials: true,
    thumbnailWidth: 150,
    thumbnailHeight: 150,

};

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
            {
                path: '',
                component: UsersComponent,
                data: {
                    title: '',
                }
            },
            {
                path: 'add',
                component: UserEditComponent,
                data: {
                    title: 'Add'
                }
            },
            {
                path: 'edit/:id',
                component: UserEditComponent,
                data: {
                    title: 'Edit'
                }
            },
            {
                path: 'view/:id',
                component: UserViewComponent,
                data: {
                    title: 'View'
                }
            },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), CommonModule, DropzoneModule, SharedCustomModule
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }],
    declarations: [UsersComponent, UserEditComponent, UserViewComponent]
})
export class UsersModule { }
