import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Todo } from 'src/models/todo';
import { TodoTag } from 'src/models/todo-tag';
import { TagService } from '../tag.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  @Input()
  renderCompact = true;
  @Output()
  onNewTodo: EventEmitter<Todo> = new EventEmitter();

  newTodoText = '';
  isCompleted = false;

  dropdownTagOptions: (TodoTag | { preview: string })[] = [];

  selectedTags: TodoTag[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private todosService: TodoService,
    private tagsService: TagService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe(tags => {
      this.dropdownTagOptions = tags.map(t => ({ ...t, preview: `${t.icon} - ${t.text}` }));
    });

    this.selectedTags = [];

    this.dropdownSettings = {
      idField: 'id',
      textField: 'preview',
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
        this.onNewTodo.emit(todo);
      }
      if (!this.renderCompact) {
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
