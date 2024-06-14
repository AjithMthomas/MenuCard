import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user/components/user-layout/user-layout.component';
import { UsersHomeComponent } from './user/components/users-home/users-home.component';
import { WaitersLayoutComponent } from './waiters/components/waiters-layout/waiters-layout.component';
import { WaitersHomeComponent } from './waiters/components/waiters-home/waiters-home.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { ProductModalComponent } from './waiters/components/product-modal/product-modal.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo:'/users',
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
                path:'index',
                component:WaitersHomeComponent
            },
            {
                path:'add',
                component:ProductModalComponent
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
