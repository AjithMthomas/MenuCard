import { RouterModule, Routes } from '@angular/router';
import { WaitersHomeComponent } from './waiters-home/waiters-home.component';
import { ProductModalComponent } from './product-modal/product-modal.component';


export const routes: Routes = [
{
path: '',
redirectTo: '/captain/index',
pathMatch: 'full',
},
  
 {
     path:'index',
     component:WaitersHomeComponent
 },
 {
     path:'add',
     component:ProductModalComponent
 }
];

export const CaptainRoutes = RouterModule.forChild(routes);