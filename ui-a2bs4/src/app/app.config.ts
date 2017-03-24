import {Injectable} from '@angular/core';
//  TODO - TSB fix name here
export interface AppConfig {
    appName: string;
}

@Injectable()
export class TwistedAppConfig implements AppConfig {
    appName: string = 'Twisted Starter Base';
}

