import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo';
import { TODOS } from '../mock-todos';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todos = TODOS;
  }

}
