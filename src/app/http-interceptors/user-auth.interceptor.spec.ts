import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, take, throwError } from 'rxjs';
import { UserService } from '../user.service';

import { UserAuthInterceptor } from './user-auth.interceptor';

describe('UserAuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let interceptor: UserAuthInterceptor;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['clearUserCredentials', 'getAccessToken']);

    TestBed.configureTestingModule({
      providers: [
        UserAuthInterceptor,
        { provide: UserService, useValue: mockUserService }
      ],
      imports: [ HttpClientTestingModule ]
    });
    
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(UserAuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Should successfully append a jwt authorization header', () => {
    const jwt = 'abc1234';
    const next: any = {
      handle: jasmine.createSpy('handle').and.callFake((request: HttpRequest<any>) => {
        expect(request.url).toEqual('/api/todos');
        expect(request.headers.has('Authorization')).toBeTrue();
        expect(request.headers.get('Authorization')).toEqual(`Bearer ${jwt}`);

        return of(request);
      })
    };

    const request: HttpRequest<any> = new HttpRequest('GET', '/api/todos');

    mockUserService.getAccessToken.and.returnValue(jwt);

    interceptor.intercept(request, next).subscribe();
  });

  it('Should not append a jwt authorization header for blacklisted endpoints', () => {
    const next: any = {
        handle: jasmine.createSpy('handle').and.callFake((request: HttpRequest<any>) => {
          expect(request.url).toEqual('login');
          expect(request.headers.has('Authorization')).toBeFalse();

          return of(request);
        })
    };

    const request: HttpRequest<any> = new HttpRequest('GET', 'login');

    interceptor.intercept(request, next).subscribe();
  });

  it('Should not append a jwt authorization header if no jwt is found', () => {
    const next: any = {
      handle: jasmine.createSpy('handle').and.callFake((request: HttpRequest<any>) => {
        expect(request.url).toEqual('/api/todos');
        expect(request.headers.has('Authorization')).toBeFalse();

        return of(request);
      })
    };

    const request: HttpRequest<any> = new HttpRequest('GET', '/api/todos');

    mockUserService.getAccessToken.and.returnValue('');

    interceptor.intercept(request, next).subscribe();
    expect(mockUserService.clearUserCredentials).toHaveBeenCalled();
  });

  it('Should call userService.clearUserCredentials when receiving a \'jwt expired\' response', () => {
    const jwt = 'abc1234';
    const next: any = {
      handle: jasmine.createSpy('handle').and.callFake(() => {
        return throwError(() => new HttpErrorResponse({
          error: 'jwt expired',
          status: 401
        }));
      })
    };

    mockUserService.getAccessToken.and.returnValue(jwt);

    const request: HttpRequest<any> = new HttpRequest('GET', '/api/todos');

    interceptor.intercept(request, next).subscribe({
      error: err => {
        expect(err).toBeTruthy();
        expect(err.error).toEqual('jwt expired');

        expect(mockUserService.clearUserCredentials).toHaveBeenCalled();
      }
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
