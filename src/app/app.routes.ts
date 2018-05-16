import { ContentLibraryComponent } from './components/dashboard/main/content-library/content-library.component';
import { HostDetailsResolverGuard } from './shared/resolvers/host-details-resolver.guard';
import { VmDetailsResolverGuard } from './shared/resolvers/vm-details-resolver.guard';
import { MainComponent } from './components/dashboard/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/misc/login/login.component';
import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { VmComponent } from './components/dashboard/main/vm/vm.component';
import { HostComponent } from './components/dashboard/main/host/host.component';
import { VmCreateComponent } from './components/vm/vm-create/vm-create.component';
import { VmMksComponent } from './components/vm/vm-mks/vm-mks.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', canActivate: [IsAuthenticatedGuard], component: DashboardComponent },
    {
        path: 'dashboard',
        canActivate: [IsAuthenticatedGuard],
        component: DashboardComponent,
        children: [
            {
                path: 'vm',
                canActivate: [IsAuthenticatedGuard],
                // resolve: {VmDetailsResolverGuard},
                component: MainComponent
            },
            {
                path: 'vm',
                canActivate: [IsAuthenticatedGuard],
                component: MainComponent,
                children: [
                    {
                        path: 'new',
                        canActivate: [IsAuthenticatedGuard],
                        component: VmCreateComponent
                    },
                    {
                        path: 'mks',
                        canActivate: [IsAuthenticatedGuard],
                        component: VmMksComponent
                    },
                    {
                        path: ':id',
                        canActivate: [IsAuthenticatedGuard],
                        resolve: {VmDetailsResolverGuard},
                        component: VmComponent
                    }
                ]
            },
            {
                path: 'host',
                canActivate: [IsAuthenticatedGuard],
                // resolve: {HostDetailsResolverGuard},
                component: MainComponent
            },
            {
                path: 'host',
                canActivate: [IsAuthenticatedGuard],
                component: MainComponent,
                children: [
                    {
                        path: ':id',
                        canActivate: [IsAuthenticatedGuard],
                        component: HostComponent
                    }
                ]
            },
            {
                path: 'library',
                canActivate: [IsAuthenticatedGuard],
                component: MainComponent
            },
            {
                path: 'library',
                canActivate: [IsAuthenticatedGuard],
                component: MainComponent,
                children: [
                    {
                        path: ':id',
                        canActivate: [IsAuthenticatedGuard],
                        component: ContentLibraryComponent
                    }
                ]
            }
        ]
    }
];
