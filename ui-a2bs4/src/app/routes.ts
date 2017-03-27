import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {SignInComponent} from './core-ui-bs/sign-in/sign-in.component';

@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet><navigation-bar></navigation-bar>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  }
];

export const routing = RouterModule.forRoot(routes);
