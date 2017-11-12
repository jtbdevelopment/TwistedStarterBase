import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {SignInComponent} from './core-games-ui-bs/sign-in/sign-in.component';
import {SignedInComponent} from './core-games-ui-bs/signed-in/signed-in.component';
import {PlayerProfileComponent} from './profile/player-profile.component';
import {AdminComponent} from './core-games-ui-bs/admin/admin.component';
import {CreateGameComponent} from './create/create-game.component';
import {PlayersAndStatesComponent} from './game-display/players-and-states.component';

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
    },
    {
        path: 'create',
        component: CreateGameComponent
    },
    //  TODO - TSB - customize?
    {
        path: 'game/challenged/:gameID',
        component: PlayersAndStatesComponent
    },
    {
        path: 'game/declined/:gameID',
        component: PlayersAndStatesComponent
    },
    {
        path: 'game/quit/:gameID',
        component: PlayersAndStatesComponent
    },
    {
        path: 'game/roundover/:gameID',
        component: PlayersAndStatesComponent
    },
    {
        path: 'game/nextroundstarted/:gameID',
        component: PlayersAndStatesComponent
    },
    /*  TODO - TSB
    {
        path: 'game/playing/:gameID',
        component: PlayersAndStatesComponent
    },
    {
        path: 'game/setup/:gameID',
        component: PlayersAndStatesComponent
    }
    */
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
