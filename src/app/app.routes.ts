import { VmDetailsResolverGuard } from './shared/resolvers/vm-details-resolver.guard';
import { MainComponent } from './components/dashboard/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/misc/login/login.component';
import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { VmComponent } from './components/dashboard/main/vm/vm.component';
import { HostComponent } from './components/dashboard/main/host/host.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', canActivate: [IsAuthenticatedGuard], component: DashboardComponent },
    { path: 'dashboard', canActivate: [IsAuthenticatedGuard], component: DashboardComponent, children: [
        // { path: 'datacenter', canActivate: [IsAuthenticatedGuard], component: },
        // { path: 'cluster', canActivate: [IsAuthenticatedGuard], component: },
        // { path: 'host', canActivate: [IsAuthenticatedGuard], component: },
        { path: 'vm', canActivate: [IsAuthenticatedGuard], resolve: {VmDetailsResolverGuard}, component: MainComponent },
        { path: 'vm', canActivate: [IsAuthenticatedGuard], component: MainComponent, children: [
            { path: ':id', canActivate: [IsAuthenticatedGuard], resolve: {VmDetailsResolverGuard}, component: VmComponent }
        ] },
        { path: 'host', canActivate: [IsAuthenticatedGuard], component: MainComponent, children: [
            { path: ':id', canActivate: [IsAuthenticatedGuard], component: HostComponent }
         ] }
    ] }
];
