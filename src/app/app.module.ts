import { VmsService } from './shared/services/vms.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import './rxjs.operators';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { LoginComponent } from './components/misc/login/login.component';
import { SessionService } from './shared/services/session.service';
import { routes } from './app.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/dashboard/inventory/inventory.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { InventoryService } from './shared/services/inventory.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    InventoryComponent,
    HeaderComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SessionService,
    InventoryService,
    VmsService,
    IsAuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
