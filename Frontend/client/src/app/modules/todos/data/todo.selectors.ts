import { PaginationParams } from './../../../shared/static/pagination-params.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from 'src/app/core/models/todo.model';
import * as fromTodo from './todo.reducer';
import { TodoListViewModel } from '../models/todo-list-view.model';

export const selectTodoState = createFeatureSelector<fromTodo.State>(
    fromTodo.todosFeatureKey
);

export const selectLoadStatus = createSelector(
    selectTodoState,
    (state: fromTodo.State): string => state.loadStatus
);

export const selectIsLoaded = createSelector(
    selectTodoState,
    (state: fromTodo.State): boolean => state.loadStatus === 'LOADED'
);

export const selectPagination = createSelector(
    selectTodoState,
    (state: fromTodo.State): PaginationParams => state.pagination
);

export const selectIsFilter = createSelector(
    selectTodoState,
    (state: fromTodo.State) : boolean => (state.filter !== null && state.filter !== undefined) ? true : false 
);

export const selectPaginationAndFilter = createSelector(
    selectTodoState,
    (state: fromTodo.State): { pagination: PaginationParams, filter: string } => ({ pagination: state.pagination, filter: state.filter })
);

export const selectTodos = createSelector(
    fromTodo.selectAll,
    selectPagination,
    (todos: Todo[], pagination: PaginationParams): Todo[] => todos.slice(((pagination.page - 1) * pagination.size), pagination.size <= todos.length ? (pagination.size * pagination.page) : todos.length)
);

export const selectTodo = (id: number) => createSelector(
    fromTodo.selectAll,
    (todos: Todo[]): Todo => todos.find(todo => todo.id === id)
);

export const selectTodoListVM = createSelector(
    selectTodos,
    selectPagination,
    (todos: Todo[], pagination: PaginationParams): TodoListViewModel => ({ todos: todos, pagination: pagination })
);

export const selectContentExists = createSelector(
    selectIsLoaded,
    fromTodo.selectIds,
    selectPagination,
    (isLoaded: boolean, ids: number[], pagination: PaginationParams) => isLoaded && ((pagination.page * pagination.size - 1) <= ids.length)
); 

export const selectIds = createSelector(
    fromTodo.selectIds,
    (ids: number[]) => ids
);


