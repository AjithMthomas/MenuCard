import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user/components/user-layout/user-layout.component';
import { UsersHomeComponent } from './user/components/users-home/users-home.component';
import { WaitersLayoutComponent } from './waiters/components/waiters-layout/waiters-layout.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';


export const routes: Routes = [

    {
        path:"",
        redirectTo:'/users/index',
        pathMatch:'full'
    },
    {
        path:'users',
        component:UserLayoutComponent,
        children:[
            {
                path:'index',
                component:UsersHomeComponent
            },
        ]
    },
    {
        path:'captain',
        component:WaitersLayoutComponent,
        children:[
            {
                path: '',
                loadChildren: () =>
                import('./waiters/captainAuthModule').then((m) => m.CatptainModule),
                }
        ]
    },
    {
        path:'admin',
        component:AdminLayoutComponent,
        children:[
            {
                path:'index',
                component:AdminHomeComponent
            }
        ]
    }

];
