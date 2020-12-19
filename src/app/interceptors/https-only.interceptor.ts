import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpsOnlyInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // clone request and replace 'http://' with 'https://' at the same time
    const httpsReq = req.clone({
      url: req.url.replace("http://", "https://")
    });

    return next.handle(httpsReq);
  }
}
