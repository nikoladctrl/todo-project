import { PaginationParams } from 'src/app/shared/static/pagination-params.model';
import { Todo } from "src/app/core/models/todo.model";

export interface TodoListViewModel
{
    todos: Todo[];
    pagination: PaginationParams;
}