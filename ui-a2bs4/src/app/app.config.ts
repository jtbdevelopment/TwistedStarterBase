import {Injectable} from '@angular/core';
import {AppConfig} from './core-games-ui/appconfig.interface';

@Injectable()
export class TwistedAppConfig implements AppConfig {
    //  TODO - TSB fix name here
    appName: string = 'Twisted Starter Base';
    //  TODO - TSB decide if annoying
    hoverMenu: boolean = true;

    version: string = '1.3';
    releaseNotes: string = 'Made some exciting changes.';
}

