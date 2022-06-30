import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TodoTag } from 'src/models/todo-tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagsUrl = '/api/tags';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient
  ) { }

  getTags(): Observable<TodoTag[]> {
    return this.http.get<TodoTag[]>(this.tagsUrl).pipe(
      catchError(this.handleError<TodoTag[]>('getTags', []))
    );
  }

  getTagById(id: number): Observable<TodoTag> {
    const url = `${this.tagsUrl}/${id}`;

    return this.http.get<TodoTag>(url).pipe(
      catchError(this.handleError<TodoTag>('getTagById'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
