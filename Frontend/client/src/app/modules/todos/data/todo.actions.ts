import { PaginationParams } from './../../../shared/static/pagination-params.model';
import { PaginationResult } from './../../../shared/static/pagination-result.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo } from '../../../core/models/todo.model';


export const getTodos = createAction(
  '[Todo List Component] Get Todos',
  props<{ pagination: PaginationParams }>()
);

export const loadTodos = createAction(
  '[Todo Effect] Load Todos'
);

export const loadTodosSuccess = createAction(
  '[Todo Effect] Load Todos Success', 
  props<{ paginatedTodos: PaginationResult<Todo> }>()
);

export const addTodo = createAction(
  '[Todo/API] Add Todo',
  props<{ todo: Todo }>()
);

export const addTodoSuccess = createAction(
  '[Todo/API] Add Todo Success',
  props<{ todo: Todo }>()
);

export const upsertTodo = createAction(
  '[Todo/API] Upsert Todo',
  props<{ todo: Todo }>()
);

export const addTodos = createAction(
  '[Todo/API] Add Todos',
  props<{ todos: Todo[] }>()
);

export const upsertTodosSuccess = createAction(
  '[Todo/API] Upsert Todos',
  props<{ paginatedTodos: PaginationResult<Todo> }>()
);

export const updateTodo = createAction(
  '[Todo List Component] Update Todo',
  props<{ id: number, todo: Todo }>()
);

export const updateTodoSuccess = createAction(
  '[Todo Effect] Update Todo Success',
  props<{ todo: Update<Todo> }>()
);

export const updateTodos = createAction(
  '[Todo/API] Update Todos',
  props<{ todos: Update<Todo>[] }>()
);

export const deleteTodo = createAction(
  '[Todo/API] Delete Todo',
  props<{ id: number }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo/API] Delete Todo Success'
);

export const deleteTodos = createAction(
  '[Todo/API] Delete Todos',
  props<{ ids: string[] }>()
);

export const clearTodos = createAction(
  '[Todo/API] Clear Todos'
);