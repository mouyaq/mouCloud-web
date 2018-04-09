import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/misc/login/login.component';
import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', canActivate: [IsAuthenticatedGuard], component: DashboardComponent }
];
