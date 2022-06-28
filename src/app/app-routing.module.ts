import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodosListComponent } from './todos-list/todos-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', 'pathMatch': 'full'},
  { path: 'todos', component: TodosListComponent },
  { path: 'new-todo', component: CreateTodoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
