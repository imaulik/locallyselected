import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';

export const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: './views/dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren: './views/users/users.module#UsersModule'
            },
            {
                path: 'categories',
                canActivate: [AuthGuard],
                loadChildren: './views/categories/categories.module#CategoriesModule'
            },
            {
                path: 'country',
                canActivate: [AuthGuard],
                loadChildren: './views/country/country.module#CountryModule'
            },
            {
                path: 'job',
                canActivate: [AuthGuard],
                loadChildren: './views/job/job.module#JobModule'
            },
            {
                path: 'review',
                canActivate: [AuthGuard],
                loadChildren: './views/review/review.module#ReviewModule'
            },
            {
                path: 'opticards',
                canActivate: [AuthGuard],
                loadChildren: './views/opticard-numbers/opticard-numbers.module#OptictadNumberModule'
            },
            {
                path: 'opticards-transactions',
                canActivate: [AuthGuard],
                loadChildren: './views/opticard-transactions/opticard-transactions.module#OpticardTransactionsModule'
            },
            {
                path: 'user-transactions',
                canActivate: [AuthGuard],
                loadChildren: './views/user-transactions/user-transactions.module#UserTransactionsModule'
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'login',
        component: SimpleLayoutComponent,
        data: {
            title: 'Login'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/login/login.module#LoginModule',
            }
        ]
    },
    {
        path: 'forget_password',
        component: SimpleLayoutComponent,
        data: {
            title: 'Forget Password'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/forget/forget.module#ForgetModule',
            }
        ]
    },
    {
        path: 'password/reset/:token',
        component: SimpleLayoutComponent,
        data: {
            title: 'Password Reset'
        },
        children: [
            {
                path: '',
                loadChildren: './views/authentication/reset/reset.module#ResetModule',
            }
        ]
    },
    {
        path: '404',
        component: SimpleLayoutComponent,
        data: {
            title: '404'
        },
        children: [
            {
                path: '',
                loadChildren: './views/error/404.module#P404Module',
            }
        ]
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
