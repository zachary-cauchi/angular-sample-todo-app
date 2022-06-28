import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  newTodoText = '';
  isCompleted = false;

  constructor(
    private todosService: TodoService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  

  createNewTodo() {
    const todoText = this.newTodoText.trim();

    if (!todoText) { return; }

    const todo = { text: todoText, dateCreated: new Date(), isComplete: this.isCompleted } as Todo;

    this.todosService.addTodo(todo)
    .subscribe(todo => {
      if (todo) {
        this.newTodoText = '';
        this.location.back();
      }
    });
  }

  newTodoOnEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.createNewTodo();
    }
  }

}
