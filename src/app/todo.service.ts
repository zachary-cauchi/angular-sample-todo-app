import { Injectable } from '@angular/core';
import { filter, Observable, of } from 'rxjs';
import { Todo } from 'src/models/todo';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = TODOS

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  getTodoById(id: number): Observable<Todo> {
    // Find a todo, telling the compiler to ignore undefineds in case one isn't found.
    const todo = this.todos.find(todo => todo.id === id)!;

    return of(todo);
  }

  addTodo(todo: Todo): Observable<Todo> {
    const foundTodo = this.todos.find(existingTodo => existingTodo === todo || existingTodo.id === todo.id)!;

    if (foundTodo) return of();

    this.todos.push(todo);

    return of(todo);
  }

  addTodoByText(text: string): Observable<Todo> {
    const todo: Todo = { id: this.genId(), text, dateCreated: new Date(), isComplete: false };

    this.todos.push(todo);

    return of(todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const todoIndex = this.todos.findIndex(existingTodo => existingTodo.id === todo.id);

    if (todoIndex < 0) return of();

    this.todos.splice(todoIndex, 1, todo);

    return of(todo);
  }

  deleteTodoById(id: number): Observable<Todo> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);

    if (todoIndex < 0) return of();

    const todo = this.todos.splice(todoIndex, 1)[0];

    return of(todo);
  }

  genId(): number {
    return this.todos.reduce((max, { id }) => Math.max(max, id), -1) + 1;
  }
}
