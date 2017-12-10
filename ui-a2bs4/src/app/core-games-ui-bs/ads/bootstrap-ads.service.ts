import {Injectable} from '@angular/core';
import {BootstrapBackdropService} from '../backdrop/bootstrap-backdrop.service';


declare function invokeApplixirVideoUnit(options: any);

@Injectable()
export class BootstrapAdsService {
    private static DEFAULT_TIME_BETWEEN_ADS: number = 2 * 60 * 100; //  2 minutes in millis
    public timeBetweenAds: number = BootstrapAdsService.DEFAULT_TIME_BETWEEN_ADS;
    private lastAdShown: Date = new Date(0);

    constructor(private backdrop: BootstrapBackdropService) {

    }

    public showAdPopup(): Promise<any> {
        let _resolve: (reason?: any) => void;
        let _reject: (reason?: any) => void;
        let promise = new Promise((resolve, reject) => {
            _reject = reject;
            _resolve = resolve;
        });
        promise.then(null, () => {
        });

        if (((new Date()).valueOf() - this.lastAdShown.valueOf()) >= this.timeBetweenAds) {
            try {
                this.backdrop.addBackdrop();
                //  TODO - actually show ad
                setTimeout(() => {
                    this.backdrop.removeBackdrop();
                    console.log('resolving');
                    _resolve();
                }, 1000);
                console.log('showing ad');
            } catch (ex) {
                console.error(ex);
                this.backdrop.removeBackdrop();
            }
        } else {
            console.log('no ad');
            _resolve();
        }
        return promise;
    }
}
