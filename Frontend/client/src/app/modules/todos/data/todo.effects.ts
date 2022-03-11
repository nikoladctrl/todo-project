import { PaginationParams } from './../../../shared/static/pagination-params.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/core/services/todo.service';
import * as TodoActions from './todo.actions';
import { concatMap, exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import * as fromTodoSelectors from './todo.selectors';
import { Todo } from 'src/app/core/models/todo.model';
import { Router } from '@angular/router';



@Injectable()
export class TodoEffects {

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodos),
      concatLatestFrom(() => this.store.select(fromTodoSelectors.selectContentExists)),
      filter(([action, contentExists]) => !contentExists || action.searchFor !== null),
      map(() => TodoActions.loadTodos())
    )
  );

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      concatLatestFrom(() => this.store.select(fromTodoSelectors.selectPaginationAndFilter)),
      switchMap(([, paginationAndFilter]) => this.todoService.getTodos(paginationAndFilter.pagination.page, paginationAndFilter.pagination.size, paginationAndFilter.filter ?? '')),
      map(paginatedData => TodoActions.loadTodosSuccess({ paginatedTodos: paginatedData }))
    )
  );

  addTodo = createEffect(() =>
    this.actions$.pipe(
        ofType(TodoActions.addTodo),
        exhaustMap((action) => this.todoService.createTodo(action.todo)),
        map((todo: Todo) => TodoActions.addTodoSuccess({ todo })),
        tap(() => this.router.navigate(['/todos']))
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        concatMap((action) => this.todoService.updateTodo(action.todo)),
        map((todo: Todo) => TodoActions.updateTodoSuccess({ todo: { id: todo.id, changes: todo } }))
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TodoActions.deleteTodo),
        switchMap((action) => this.todoService.deleteTodo(action.id)),
        map(() => TodoActions.deleteTodoSuccess()),
        tap(() => this.router.navigate(['/todos']))
    )
  );

  clearState$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(TodoActions.getTodos),
        concatLatestFrom(() => this.store.select(fromTodoSelectors.selectIsFilter)),
        filter(([, filter]) => filter),
        map(() => TodoActions.clearTodos())
    );
  });

  constructor(
    private actions$: Actions, 
    private store: Store, 
    private todoService: TodoService, 
    private router: Router
  ) {}

}
