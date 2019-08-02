import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedCustomModule } from '../../shared.module';
import {JobComponent} from './job.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Categories'
        },
        children: [
            {
                path: '',
                component: JobComponent,
                data: {
                    title: '',
                }
            },
            // {
            //     path: 'add',
            //     component: UserEditComponent,
            //     data: {
            //         title: 'Add'
            //     }
            // },
            // {
            //     path: 'edit/:id',
            //     component: UserEditComponent,
            //     data: {
            //         title: 'Edit'
            //     }
            // },
            // {
            //     path: 'view/:id',
            //     component: UserViewComponent,
            //     data: {
            //         title: 'View'
            //     }
            // },

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), CommonModule,  SharedCustomModule
    ],
    providers: [],
    declarations: [JobComponent]
})
export class JobModule { }
