import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerProfileComponent} from './profile/player-profile.component';
import {CreateGameComponent} from './create/create-game.component';
import {PlayersAndStatesComponent} from './game-display/players-and-states.component';
import {AdminComponent, JTBCoreGamesUIBootstrap, SignedInComponent, SignInComponent} from 'jtb-core-games-bootstrap-ui';
import {MainComponent} from './main';

const routes: Routes = [
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

@NgModule({
  imports: [
      JTBCoreGamesUIBootstrap,
      RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
