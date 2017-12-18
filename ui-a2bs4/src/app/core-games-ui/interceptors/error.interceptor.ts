import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {MessageBusService} from '../messagebus/message-bus.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private messageBus: MessageBusService) {
        console.log('init');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let subject = new Subject<HttpEvent<any>>();
        next.handle(req).subscribe((event) => {
            // Remember, there may be other events besides just the response.
            if (event instanceof HttpResponse) {
                console.log('ere');
                switch (event.status) {
                    case 409:
                        subject.next(event);
                        break;
                    case 401:
                        this.messageBus.invalidSessionError.next(event);
                        break;
                    default:
                        this.messageBus.generalError.next(event);
                        break;
                }
            }
        });
        return Observable.from(subject);
    }
}
