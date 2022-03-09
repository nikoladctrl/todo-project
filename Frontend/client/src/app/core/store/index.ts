import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTodo from '../../modules/todos/data/todo.reducer';


export interface AppState {
  [fromTodo.todosFeatureKey]: fromTodo.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromTodo.todosFeatureKey]: fromTodo.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
