import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TodoTag } from 'src/models/todo-tag';
import { TagService } from '../tag.service';
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
    private tagsService: TagService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(tags => {
      this.dropdownTagOptions = tags;
    });

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
