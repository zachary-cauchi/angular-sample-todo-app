import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Todo } from 'src/models/todo';
import { TodoTag } from 'src/models/todo-tag';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  newTodoText = '';
  isCompleted = false;

  dropdownTagOptions: TodoTag[] = [];

  selectedTags: TodoTag[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private todosService: TodoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.dropdownTagOptions = [
      { id: 0, text: 'general', icon: '•' },
      { id: 1, text: 'test', icon: '🔧' },
      { id: 2, text: 'shopping', icon: '🛒' },
      { id: 3, text: 'birthday', icon: '🍰' },
      { id: 4, text: 'cooking', icon: '🥞' }
    ];

    this.selectedTags = [];

    this.dropdownSettings = {
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select all Tags',
      unSelectAllText: 'Unselect all Tags',
      allowSearchFilter: true,
      enableCheckAll: true,
    };
  }

  createNewTodo() {
    const todoText = this.newTodoText.trim();

    if (!todoText) { return; }

    const todo = { text: todoText, dateCreated: new Date(),  tags: this.selectedTags.map(t => t.id), isComplete: this.isCompleted };

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
