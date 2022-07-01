import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  private urlBlacklist = [
    'login'
  ];
  private skipCurrentRequest = false;

  constructor(
    private userService: UserService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // If the url is blacklisted, don't modify the request.
    this.skipCurrentRequest = false;
    this.urlBlacklist.forEach(url => {
      if (req.url.includes(url)) {
        this.skipCurrentRequest = true;
      }
    })

    if (this.skipCurrentRequest) {
      return next.handle(req);
    }

    const authToken = this.userService.getAccessToken();
    
    if (!authToken) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next.handle(authReq);
  }
}
