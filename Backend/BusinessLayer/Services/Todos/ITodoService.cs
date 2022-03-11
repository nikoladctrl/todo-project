using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.DTOs;
using Core.Helpers;

namespace BusinessLayer.Services.Todos
{
    public interface ITodoService
    {
        Task<TodoDto> CreateTodo(CreateTodoDto createTodoDto);
        Task<TodoDto> UpdateTodo(UpdateTodoDto updateTodoDto);
        Task DeleteTodo(int id);
        Task<PaginationResult<TodoDto>> GetTodos(Params @params);
        Task<TodoDto> GetTodo(int id);
        Task<PaginationResult<TodoDto>> GetFilteredTodos(PaginationWithFiltersDto @params);
    }
}