import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo';
import { TodoTag } from 'src/models/todo-tag';
import { TagService } from '../tag.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  tags: TodoTag[] = [];
  todos: Todo[] = [];

  constructor(
    private todosService: TodoService,
    private tagsService: TagService
  ) { }

  ngOnInit(): void {
    this.getTodos();
    this.getTags();
  }

  private getTodos() {
    this.todosService.getTodos().subscribe(todos => this.todos = todos);
  }

  private getTags() {
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
  }

  getTagIcon(id: number) {
    return this.tags.find(t => t.id === id)?.icon;
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

  addNewTodo(todo: Todo) {
    this.todos.push(todo);
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id)
      .subscribe(todo => {
        if (todo) {
          this.todos = this.todos.filter(t => t.id !== id);
        }
      });
  }

}
