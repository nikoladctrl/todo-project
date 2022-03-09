import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/core/models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import * as TodoActions from '../../data/todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {

  constructor(private store: Store<AppState>) { }

  @Input() todo: Todo;
  @Output() action = new EventEmitter<{ type: string, id: number }>(null);


  onDelete(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

}
