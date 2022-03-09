import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './data/todo.effects';
import { TodoListComponent } from './ui/todo-list/todo-list.component';
import { TodoItemComponent } from './ui/todo-item/todo-item.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
  ]
})
export class TodosModule { }
