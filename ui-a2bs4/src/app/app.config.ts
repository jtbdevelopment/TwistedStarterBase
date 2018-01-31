import {Injectable} from '@angular/core';
import {AppConfig} from 'jtb-core-games-ui';

@Injectable()
export class TwistedAppConfig implements AppConfig {
    //  TODO - TSB fix name here
    appName: string = 'Twisted Starter Base';
    //  TODO - TSB decide if annoying
    hoverMenu: boolean = true;
    //  TODO - TSB make a better message
    inviteFriendsMessage = 'Come play TSB with me!';

    version: string = '1.3';
    releaseNotes: string = 'Made some exciting changes.';
}

