using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Helpers;
using EFCore.Context;
using Microsoft.EntityFrameworkCore;

namespace EFCore.Repositories.Todos
{
    public class TodoRepository : ITodoRepository
    {
        private readonly DataContext _context;
        public TodoRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Todo> CreateTodo(Todo todo)
        {
            await _context.Todos.AddAsync(todo);
            await _context.SaveChangesAsync();

            return todo;
        }

        public async Task<Todo> UpdateTodo(Todo todo)
        {
            _context.Todos.Update(todo);
            await _context.SaveChangesAsync();

            return await GetTodo(todo.Id);
        }
        
        public async Task DeleteTodo(int id)
        {
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id);
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
        }

        public async Task<PaginationResult<Todo>> GetTodos(PaginationParams @params)
        {
            var query = _context.Todos
                                .OrderBy(o => o.Id);

            var total = query.Count();

            var todos = await query
                        .Skip((@params.Page - 1) * @params.Size)
                        .Take(@params.Size)
                        .AsSingleQuery()
                        .ToListAsync();

            return new PaginationResult<Todo>(todos, @params.Page, @params.Size, total);
        }

        public async Task<Todo> GetTodo(int id)
        {
            return await _context.Todos.FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}