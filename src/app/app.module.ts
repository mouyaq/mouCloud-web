import { LibraryItemsResolverGuard } from './shared/resolvers/library-items-resolver.guard';
import { ContentLibraryComponent } from './components/dashboard/main/content-library/content-library.component';
import { TaskService } from './shared/services/task.service';
import { ResourcePoolService } from './shared/services/resource-pool.service';
import { FolderService } from './shared/services/folder.service';
import { DatastoreService } from './shared/services/datastore.service';
import { HostDetailsResolverGuard } from './shared/resolvers/host-details-resolver.guard';
import { VmDetailsResolverGuard } from './shared/resolvers/vm-details-resolver.guard';
import { HostService } from './shared/services/host.service';
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
import { VmService } from './shared/services/vm.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { MainComponent } from './components/dashboard/main/main.component';
import { VmComponent } from './components/dashboard/main/vm/vm.component';
import { HostComponent } from './components/dashboard/main/host/host.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { VmCreateComponent } from './components/vm/vm-create/vm-create.component';
import { VmMksComponent } from './components/vm/vm-mks/vm-mks.component';
import { ContentLibraryService } from './shared/services/content-library.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    InventoryComponent,
    HeaderComponent,
    MainComponent,
    VmComponent,
    HostComponent,
    FooterComponent,
    VmCreateComponent,
    VmMksComponent,
    ContentLibraryComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
    // RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    SessionService,
    InventoryService,
    VmService,
    HostService,
    DatastoreService,
    FolderService,
    ResourcePoolService,
    TaskService,
    IsAuthenticatedGuard,
    VmDetailsResolverGuard,
    HostDetailsResolverGuard,
    ContentLibraryService,
    LibraryItemsResolverGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
