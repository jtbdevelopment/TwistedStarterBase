import {Injectable} from '@angular/core';
import {AppConfig} from 'jtb-core-games-ui';

@Injectable()
export class TwistedAppConfig implements AppConfig {
    //  TODO - TSB fix name here
    appName = 'Twisted Starter Base';
    //  TODO - TSB decide if annoying
    hoverMenu = true;
    //  TODO - TSB make a better message
    // noinspection JSUnusedGlobalSymbols
    inviteFriendsMessage = 'Come play TSB with me!';

    //  TODO - Set version and notes
    version = '1.3';
    releaseNotes = 'Made some exciting changes.';
}

