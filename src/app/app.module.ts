import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { StrikethroughComponent } from './strikethrough/strikethrough.component';
import { TextEditInPlaceComponent } from './text-edit-in-place/text-edit-in-place.component';
import { TextViewModeDirective } from './text-view-mode.directive';
import { TextEditModeDirective } from './text-edit-mode.directive';
import { TextEditOnEnterDirective } from './text-edit-on-enter.directive';
import { HttpClientModule } from '@angular/common/http';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TodoIconPipe } from './todo-icon.pipe';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS_PROVIDERS } from './http-interceptors';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    StrikethroughComponent,
    TextEditInPlaceComponent,
    TextViewModeDirective,
    TextEditModeDirective,
    TextEditOnEnterDirective,
    CreateTodoComponent,
    TodoIconPipe,
    LoginComponent,
    NavBarComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    ...HTTP_INTERCEPTORS_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
