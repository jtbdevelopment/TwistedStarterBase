import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';

import {MainComponent} from './main';
import {FooterComponent} from './navbar/footer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    NgbModule.forRoot()
  ],
  declarations: [
    RootComponent,
    MainComponent,
    FooterComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
