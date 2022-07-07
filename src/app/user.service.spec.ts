import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FullUser, User } from 'src/models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loginUser', () => {
    it('Should log in a user successfully', () => {
      const setItemSpy = spyOn(window.sessionStorage, 'setItem');
      const email = 'test@test.com';
      const pass = 'abc1234';
  
      const jwt = 'abc1234';
      const user: User = {
        id: 1,
        email,
        firstname: 'Test',
        lastname: 'User'
      };
      const mockResponse = {
        accessToken: jwt,
        user
      };
  
      service.loginUser(email, pass).subscribe(response => {
        expect(response).toBeTruthy();
        
        expect(setItemSpy).toHaveBeenCalledTimes(2);
        expect(setItemSpy.calls.allArgs()[0]).toEqual([ 'accessToken', jwt ]);
        expect(setItemSpy.calls.allArgs()[1]).toEqual([ 'user', JSON.stringify(user) ]);
      });
  
      const req = httpTestingController.expectOne('/api/login');
  
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        email,
        password: pass
      });
  
      req.flush(mockResponse);
  
      httpTestingController.verify();
    });

    it('Should not log in a user if no email is provided', () => {
      const email = '';
      const pass = 'abc1234';

      service.loginUser(email, pass).subscribe({
        next: () => {
          fail('An error in login should return an error');
        },
        error: res => {
          expect(res).toEqual('No email address was provided');
        }
      });
  
      httpTestingController.expectNone('/api/login');

      httpTestingController.verify();
    });

    it('Should not log in a user if no password is provided', () => {
      const email = 'test@test.com';
      const pass = '';

      service.loginUser(email, pass).subscribe({
        next: () => {
          fail('An error in login should return an error');
        },
        error: res => {
          expect(res).toEqual('No password was provided');
        }
      });
  
      httpTestingController.expectNone('/api/login');

      httpTestingController.verify();
    });

    it('Should not log in a user if the request fails', () => {
      const email = 'test@test.com';
      const pass = 'abc1234';

      service.loginUser(email, pass).subscribe(res => {
        expect(res.status).toEqual(500);
      });
  
      const req = httpTestingController.expectOne('/api/login');

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({
        email,
        password: pass
      });

      req.flush('Sorry fam, this endpoint ain\'t bussin', { status: 500, statusText: 'Internal Server Error' });

      httpTestingController.verify();
    });
  });

  describe('createUser', () => {
    it('Should sign up a user successfully', () => {
      const setItemSpy = spyOn(window.sessionStorage, 'setItem');
  
      const jwt = 'abc1234';
      const payload: Omit<FullUser, 'id'> = {
        email: 'test@test.com',
        password: 'abc1234',
        firstname: 'Test',
        lastname: 'User'
      };

      const user: User = {
        ...payload,
        id: 1
      };

      const mockResponse = {
        accessToken: jwt,
        user
      };
  
      service.createUser(payload).subscribe(response => {
        expect(response).toBeTruthy();
        
        expect(setItemSpy).toHaveBeenCalledTimes(2);
        expect(setItemSpy.calls.allArgs()[0]).toEqual([ 'accessToken', jwt ]);
        expect(setItemSpy.calls.allArgs()[1]).toEqual([ 'user', JSON.stringify(user) ]);
      });
  
      const req = httpTestingController.expectOne('/api/signup');
  
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(payload);
  
      req.flush(mockResponse);
  
      httpTestingController.verify();
    });

    it('Should not signup a user if no user is provided', () => {
      const setItemSpy = spyOn(window.sessionStorage, 'setItem');

      service.createUser(null!).subscribe({
        next: () => {
          fail('An error in login should return an error');
        },
        error: res => {
          expect(res).toEqual('No user provided, must provide a valid user.');
        }
      });
  
      httpTestingController.expectNone('/api/signup');

      httpTestingController.verify();
    });

    it('Should not signup a user if no email address is provided', () => {
      const payload: Omit<FullUser, 'id'> = {
        email: '',
        password: 'abc1234',
        firstname: 'Test',
        lastname: 'User'
      };

      service.createUser(payload).subscribe({
        next: () => {
          fail('An error in login should return an error');
        },
        error: res => {
          expect(res).toEqual('No email address was provided');
        }
      });
  
      httpTestingController.expectNone('/api/signup');

      httpTestingController.verify();
    });

    it('Should not signup a user if no password is provided', () => {
      const payload: Omit<FullUser, 'id'> = {
        email: 'test@test.com',
        password: '',
        firstname: 'Test',
        lastname: 'User'
      };

      service.createUser(payload).subscribe({
        next: () => {
          fail('An error in login should return an error');
        },
        error: res => {
          expect(res).toEqual('No password was provided');
        }
      });
  
      httpTestingController.expectNone('/api/signup');

      httpTestingController.verify();
    });

    it('Should not signup a user if the request fails', () => {
      const payload: Omit<FullUser, 'id'> = {
        email: 'test@test.com',
        password: 'abc1234',
        firstname: 'Test',
        lastname: 'User'
      };

      service.createUser(payload).subscribe(res => {
        expect(res.status).toEqual(500);
      });
  
      const req = httpTestingController.expectOne('/api/signup');

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(payload);

      req.flush('Sorry fam, this endpoint ain\'t bussin', { status: 500, statusText: 'Internal Server Error' });

      httpTestingController.verify();
    });
  });

  describe('successfulLogin', () => {
    it('Should save a valid user and access token to session storage', () => {
      const setItemSpy = spyOn(window.sessionStorage, 'setItem');
      const jwt = 'abc1234';
      const user = {
        id: 1,
        firstname: 'Test',
        lastname: 'User',
        email: 'test@test.com'
      };

      service.successfulLogin({
        accessToken: jwt,
        user
      });

      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(setItemSpy.calls.allArgs()[0]).toEqual([ 'accessToken', jwt ]);
      expect(setItemSpy.calls.allArgs()[1]).toEqual([ 'user', JSON.stringify(user) ]);
    });

    it('Should not save a valid user if no access token is provided', () => {
      const setItemSpy = spyOn(window.sessionStorage, 'setItem');
      const jwt = '';
      const user = {
        id: 1,
        firstname: 'Test',
        lastname: 'User',
        email: 'test@test.com'
      };

      service.successfulLogin({
        accessToken: jwt,
        user
      });

      expect(setItemSpy).not.toHaveBeenCalled();
    });

    it('Should not save a valid access token if no user is provided', () => {
      const setItemSpy = spyOn(window.sessionStorage, 'setItem');
      const jwt = 'abc1234';
      const user = null!;

      service.successfulLogin({
        accessToken: jwt,
        user
      });

      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });

  describe('clearUserCredentials', () => {
    it('Should save a valid user and access token to session storage', () => {
      const removeItemSpy = spyOn(window.sessionStorage, 'removeItem');
      
      service.clearUserCredentials();

      expect(removeItemSpy).toHaveBeenCalledTimes(2);
      expect(removeItemSpy.calls.allArgs()[0]).toEqual([ 'user' ]);
      expect(removeItemSpy.calls.allArgs()[1]).toEqual([ 'accessToken' ]);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
