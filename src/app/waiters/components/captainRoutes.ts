import { RouterModule, Routes } from '@angular/router';
import { WaitersHomeComponent } from './captain-products/waiters-home.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { WaiterCategoryComponent } from './waiter-category/waiter-category.component';
import { CaptainHomeComponent } from './captain-home/captain-home.component';


export const routes: Routes = [
{
path: '',
redirectTo: '/captain/index',
pathMatch: 'full',
},
  
 {
     path:'index',
     component:CaptainHomeComponent
 },
 {
     path:'products',
     component:WaitersHomeComponent
 },
 {
     path:'add',
     component:ProductModalComponent
 },
 {
     path:'category',
     component:WaiterCategoryComponent
 }
];

export const CaptainRoutes = RouterModule.forChild(routes);