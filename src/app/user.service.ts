import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { FullUser, User } from 'src/models/user';

export type LoginResponse = {
  accessToken?: string,
  user?: User,
  error?: string,
  status?: number
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = '/api/signup';
  private loginUrl = '/api/login';
  private usersUrl = '/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    if (!email) {
      return throwError(() => 'No email address was provided');
    } else if (!password) {
      return throwError(() => 'No password was provided');
    }

    return this.http.post(this.loginUrl, { email, password }, this.httpOptions).pipe(
      map(this.successfulLogin),
      catchError(this.handleError<any>('loginUser')),
    );
  }

  createUser(user: Omit<FullUser, 'id'>): Observable<any> {
    if (!user) {
      return throwError(() => 'No user provided, must provide a valid user.');
    } else if (!user.email) {
      return throwError(() => 'No email address was provided');
    } else if (!user.password) {
      return throwError(() => 'No password was provided');
    }

    return this.http.post(this.registerUrl, user, this.httpOptions).pipe(
      map(this.successfulLogin),
      catchError(this.handleError('createUser')),
    );
  }

  successfulLogin(res: LoginResponse) {
    if (res.accessToken && res.user) {
      const user = res.user;
  
      sessionStorage.setItem('accessToken', res.accessToken || '');
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    return res;
  }

  getLoggedInUser(): User {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}') as User;

    return user;
  }

  getLoggedInUserId(): number {
    const userId = this.getLoggedInUser()?.id;

    return userId;
  }

  clearUserCredentials() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('accessToken');
  }

  getAccessToken(): string {
    const accessToken = sessionStorage.getItem('accessToken') as string;

    return accessToken;
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(error);
    };
  }
}
