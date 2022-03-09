import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/models/todo.model';
import * as TodoActions from '../../data/todo.actions';
import * as fromTodoSelectors from '../../data/todo.selectors';
import { AppState } from 'src/app/core/store';
import { PaginationParams } from 'src/app/shared/static/pagination-params.model';
import { TodoListViewModel } from '../../models/todo-list-view.model';
import { last, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  vm$: Observable<TodoListViewModel>;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.select(fromTodoSelectors.selectPagination).pipe(take(1)).subscribe(pagination => 
      this.store.dispatch(TodoActions.getTodos({ pagination }))
    );
    this.vm$ = this.store.select(fromTodoSelectors.selectTodoListVM).pipe(tap(data => console.log(data)));
  }
  
  onAction(event : { type: string, id: number }) {
    
    switch (event.type) {
      case 'update':
        break;
        
      case 'delete': 
        this.store.dispatch(TodoActions.deleteTodo({ id: event.id }));
        break;
        
      default:
        break;
    }
  }

  onCreate() {
    const todo = {
      title: 'string',
      content: 'string'
    };
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }
      
  onChangePage(pagination: PaginationParams) {
    this.store.dispatch(TodoActions.getTodos({ pagination }));
  }
}
