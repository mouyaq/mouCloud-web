import { SessionService } from './../services/session.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionService.getToken();
    console.log('INTERCEPTOR: ' + JSON.stringify(req));
    if (token) {
        console.log("INTERCEPTOR: HAS TOKEN");
        req = req.clone({ headers: req.headers.set('vmware-api-session-id', token) });
    }
    if (!req.headers.has('Content-Type')) {
        console.log('INTERCEPTOR: NOT HAS CONTENT-TYPE');
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    console.log('INTERCEPTOR: ' + JSON.stringify(req));

    return next.handle(req);
  }
}
