import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserNoPassword } from 'src/models/user';

export type LoginResponse = {
  accessToken?: string,
  user?: UserNoPassword,
  error?: string,
  status?: number
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = '/api/register';
  private loginUrl = '/api/login';
  private usersUrl = '/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.http.post(this.loginUrl, { email, password }, this.httpOptions).pipe(
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError<any>('loginUser')),
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(error);
    };
  }
}
