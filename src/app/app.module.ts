import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosListComponent,
    StrikethroughComponent,
    TextEditInPlaceComponent,
    TextViewModeDirective,
    TextEditModeDirective,
    TextEditOnEnterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
