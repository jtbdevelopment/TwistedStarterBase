import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {SignInComponent} from './core-ui-bs/sign-in/sign-in.component';
import {SignedInComponent} from './core-ui-bs/signed-in/signed-in.component';
import {PlayerProfileComponent} from './profile/player-profile.component';
import {AdminComponent} from './core-ui-bs/admin/admin.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin'
    },
    {
        path: 'profile',
        component: PlayerProfileComponent
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
    },
    {
        path: 'admin',
        component: AdminComponent
    }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
