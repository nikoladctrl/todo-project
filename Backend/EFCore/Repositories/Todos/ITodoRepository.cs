using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Helpers;

namespace EFCore.Repositories.Todos
{
    public interface ITodoRepository
    {
        Task<Todo> CreateTodo(Todo todo);
        Task<Todo> UpdateTodo(Todo todo);
        Task DeleteTodo(int id);
        Task<PaginationResult<Todo>> GetTodos(PaginationParams @params);
        Task<Todo> GetTodo(int id);
    }
}