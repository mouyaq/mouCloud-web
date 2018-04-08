import { LoginComponent } from './components/misc/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
];