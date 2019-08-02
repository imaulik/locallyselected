import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedCustomModule } from '../../shared.module';
import {OpticardTransactionsComponent} from './opticard-transactions.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Opticards'
        },
        children: [
            {
                path: '',
                component: OpticardTransactionsComponent,
                data: {
                    title: '',
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes), SharedCustomModule
    ],
    providers: [],
    declarations: [OpticardTransactionsComponent]
})
export class OpticardTransactionsModule { }
