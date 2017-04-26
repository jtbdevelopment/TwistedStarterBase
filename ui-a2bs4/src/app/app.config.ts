import {Injectable} from '@angular/core';
//  TODO - TSB fix name here
export interface AppConfig {
    appName: string;
    hoverMenu: boolean;
}

@Injectable()
export class TwistedAppConfig implements AppConfig {
    appName: string = 'Twisted Starter Base';
    //  TODO - TSB decide if annoying
    hoverMenu: boolean = true;
}

