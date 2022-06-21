import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Todo } from 'src/models/todo';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  
  constructor() { }

  createDb() {
    return {
      todos: TODOS
    };
  }

  genId(todos: Todo[]): number {
    return todos?.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
