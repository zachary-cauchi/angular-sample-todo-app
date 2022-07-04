import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {

  private urlBlacklist = [
    'login',
    'signup'
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
      return this.handleReq(next, req);
    }

    const authToken = this.userService.getAccessToken();
    
    if (!authToken) {
      return this.handleReq(next, req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return this.handleReq(next, authReq);
  }

  private handleReq(next: HttpHandler, req: HttpRequest<any>) {
    return next.handle(req).pipe(
      tap({
        error: err => {
          this.checkIfJwtExpired(err);
        }
      })
    )
  }

  private checkIfJwtExpired(err: HttpErrorResponse) {
    if (err.error === 'jwt expired') {
      this.userService.clearUserCredentials();
    }
  }
}
