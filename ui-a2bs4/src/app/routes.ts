import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {PlayerProfileComponent} from './profile/player-profile.component';
import {CreateGameComponent} from './create/create-game.component';
import {PlayersAndStatesComponent} from './game-display/players-and-states.component';
import {AdminComponent, SignedInComponent, SignInComponent} from 'jtb-core-games-bootstrap-ui';

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
    {
        //  TODO - TSB
        path: 'game/setup/:gameID',
        component: PlayersAndStatesComponent
    },
    {
        //  TODO - TSB
        path: 'game/playing/:gameID',
        component: PlayersAndStatesComponent
    },
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
