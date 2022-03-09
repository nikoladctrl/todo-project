import { PaginationResult } from './../../shared/static/pagination-result.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url: string = `${environment.baseUrl}/todos`;

  constructor(private http: HttpClient) { }

  getTodos(page: number, size: number) {
    let params = new HttpParams().set('page', JSON.stringify(page)).append('size', JSON.stringify(size));
    return this.http.get<PaginationResult<Todo>>(this.url, { params: params }).pipe(tap(todos => console.log(todos)));
  }

  getTodo(id: number) {
    return this.http.get<Todo>(`${this.url}/${id}`);
  }

  createTodo(todo: Todo) {
    return this.http.post<Todo>(this.url, todo);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
