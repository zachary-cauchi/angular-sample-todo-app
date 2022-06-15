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

}
