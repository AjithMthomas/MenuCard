import { Routes, RouterModule } from '@angular/router';
import { CaptainAuthGuard } from '../core/captainAuthGuard';
import { CaptainLoginComponent } from '../auth/components/captain-login/captain-login.component';
import { WaitersLayoutComponent } from './components/waiters-layout/waiters-layout.component';


const routes: Routes = [
{ path: 'login', canActivate:[CaptainAuthGuard],data:{role:'checkIsLoggedIn'}, component: CaptainLoginComponent },
{
path: '',
canActivate: [],
component: WaitersLayoutComponent,
loadChildren: () =>
import('../waiters/components/capatainModules').then((m) => m.CatptainModules),
}
];

export const CaptainAuthRoute = RouterModule.forChild(routes);