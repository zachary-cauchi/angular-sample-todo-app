import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Todo } from 'src/models/todo';
import { UserService } from './user.service';

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
    private http: HttpClient,
    private userService: UserService
  ) { }

  getTodos(): Observable<Todo[]> {
    const userId = this.userService.getLoggedInUserId();

    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        catchError(this.handleError<Todo[]>('getTodos', [])),
        map(todos => todos.filter(t => t.userId === userId))
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

  addTodo(todo: Omit<Todo, 'id' | 'userId'>): Observable<Todo> {
    const userId = this.userService.getLoggedInUserId();

    if (!userId) {
      return throwError(() => ({
        error: 'User not logged in, cannot create new todo',
      }));
    }

    const payload = { ...todo, userId };

    return this.http.post<Todo>(this.todosUrl, payload, this.httpOptions)
      .pipe(
        catchError(this.handleError<Todo>('addTodo'))
      );
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    const payload = { ...todo, userId: this.userService.getLoggedInUserId() };
    const userId = this.userService.getLoggedInUserId();

    if (!userId) {
      return throwError(() => ({
        error: 'User not logged in, cannot update this todo',
      }));
    } else if (userId !== todo.userId) {
      return throwError(() => ({
        error: 'User does not own this todo, cannot perform update',
      }));
    }

    return this.http.put(url, payload, this.httpOptions)
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
