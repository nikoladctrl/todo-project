import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../../../core/models/todo.model';
import * as TodoActions from './todo.actions';
import { PaginationParams } from 'src/app/shared/static/pagination-params.model';
import * as fromTodoSelectors from './todo.selectors';
import { isDataSource } from '@angular/cdk/collections';

export const todosFeatureKey = 'todos';

export interface State extends EntityState<Todo> {  
  loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED' | 'FULLY_LOADED';
  pagination: PaginationParams;
  filter: string;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  loadStatus: 'NOT_LOADED',
  pagination: {
    page: 1,
    size: 5,
    numberOfPages: null,
    total: null,
    hasNext: null,
    hasPrevious: null
  },
  filter: null
});

export const reducer = createReducer(
  initialState,
  on(TodoActions.getTodos, (state, action) => {
    return {
      ...state,
      pagination: action.pagination,
      filter: action.searchFor
    };
  }),
  on(TodoActions.loadTodos, (state) => {
    return {
      ...state,
      loadStatus: 'LOADING'
    };
  }),
  on(TodoActions.addTodoSuccess,
    (state, action) => adapter.addOne(action.todo, {
      ...state,
      pagination: {
        ...state.pagination,
        total: state.pagination.total + 1,
        numberOfPages: ((state.pagination.total +1) > (state.pagination.size * state.pagination.numberOfPages)) ? state.pagination.numberOfPages + 1 : state.pagination.numberOfPages,
        page: (((state.pagination.total +1) > (state.pagination.size * state.pagination.numberOfPages)) && state.pagination.page === state.pagination.numberOfPages) ? state.pagination.page + 1 : state.pagination.page
      }
    })
  ),
  on(TodoActions.upsertTodo,
    (state, action) => adapter.upsertOne(action.todo, state)
  ),
  on(TodoActions.addTodos,
    (state, action) => adapter.addMany(action.todos, state)
  ),
  on(TodoActions.upsertTodosSuccess,
    (state, action) => adapter.upsertMany(action.paginatedTodos.items, {
      ...state,
      pagination: { ...action.paginatedTodos.pagination }
    })
  ),
  on(TodoActions.updateTodoSuccess,
    (state, action) => adapter.updateOne(action.todo, state)
  ),
  on(TodoActions.updateTodos,
    (state, action) => adapter.updateMany(action.todos, state)
  ),
  on(TodoActions.deleteTodo,
    (state, action) => adapter.removeOne(action.id, {
      ...state,
      pagination: {
        ...state.pagination,
        total: state.pagination.total - 1,
        page: ((state.pagination.page - 1) * state.pagination.size === state.pagination.total - 1) ? state.pagination.page - 1 : state.pagination.page,
        numberOfPages: ((state.pagination.numberOfPages - 1) * state.pagination.size === state.pagination.total - 1) ? state.pagination.numberOfPages - 1 : state.pagination.numberOfPages
      }
    })
  ),
  on(TodoActions.deleteTodos,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TodoActions.loadTodosSuccess,
    (state, action) => adapter.addMany(action.paginatedTodos.items, {
      ...state,
      pagination: { ...action.paginatedTodos.pagination },
      loadStatus: action.paginatedTodos.pagination.total === state.ids.length ? 'FULLY_LOADED' : 'LOADED'
    })
  ),
  on(TodoActions.clearTodos,
    state => adapter.removeAll(state)
  )
);


export const selectTodoState = createFeatureSelector<State>(
  todosFeatureKey
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectTodoState);
