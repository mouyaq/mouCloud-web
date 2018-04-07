import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import './rxjs.operators';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
