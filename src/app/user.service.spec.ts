import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/models/user';

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

    it('Should not log in a user if no email is provided');

    it('Should not log in a user if no password is provided');
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
