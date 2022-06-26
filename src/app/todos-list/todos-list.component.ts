import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  todos: Todo[] = [];

  newTodoText = '';

  constructor(
    private todosService: TodoService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todosService.getTodos().subscribe(todos => this.todos = todos);
  }

  updateTodo(todo: Todo) {
    this.todosService.updateTodo(todo).subscribe();
  }

  updateTodoText(todo: Todo, newText: string) {
    this.updateTodo({ ...todo, text: newText});
  }

  updateTodoComplete(todo: Todo, isComplete: boolean) {
    this.updateTodo({ ...todo, isComplete });
  }

  createNewTodo() {
    const todoText = this.newTodoText.trim();

    if (!todoText) { return; }

    const todo = { text: todoText, dateCreated: new Date(), isComplete: false } as Todo;

    this.todosService.addTodo(todo)
    .subscribe(todo => {
      this.newTodoText = '';
      this.todos.push(todo);
    });
  }

  deleteTodo(id: number) {
    // this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosService.deleteTodo(id)
      .subscribe(todo => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  newTodoOnEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.createNewTodo();
    }
  }

}
