import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, of } from 'rxjs';
import { Todo } from 'src/models/todo';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  todos: Todo[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  getTodoById(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/id=${id}`;

    return this.http.get<Todo>(url).pipe(
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Todo[]>(`${this.todosUrl}?text=${term}`).pipe(
      catchError(this.handleError<Todo[]>('searchTodos', []))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(
        catchError(this.handleError<Todo>('addTodo'))
      );
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    
    return this.http.put(url, todo, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(`updateTodo id=${todo.id}`))
      );
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
