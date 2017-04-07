import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {SignInComponent} from './core-ui-bs/sign-in/sign-in.component';
import {SignedInComponent} from './core-ui-bs/signed-in/signed-in.component';
import {AtmosphereService} from './core-ui/livefeed/atmosphere.service';

@Component({
  selector: 'fountain-root',
  template: '<router-outlet></router-outlet><navigation-bar></navigation-bar>'
})
export class RootComponent {
    constructor(liveFeedService: AtmosphereService) {
        //  TODO - better than this for liveFeed
        liveFeedService.endPoint = '';
    }
}

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin'
    },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signedin',
    component: SignedInComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
