import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedCustomModule } from '../../shared.module';
import { OpticardNumbersListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Opticards'
    },
    children: [
      {
        path: '',
        component: OpticardNumbersListViewComponent,
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
  declarations: [OpticardNumbersListViewComponent]
})
export class OptictadNumberModule { }
