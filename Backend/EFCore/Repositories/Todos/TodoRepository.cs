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
                                .OrderBy(o => o.Id)
                                .AsQueryable();

            if (!String.IsNullOrEmpty(@params.Filter)) {
                query = query.Where(t => t.Title.ToLower().Contains(@params.Filter.ToLower()) || t.Content.ToLower().Contains(@params.Filter.ToLower()));
            }

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

        public async Task<PaginationResult<Todo>> GetFilteredTodos(PaginationWithFiltersDto @params)
        {
            var query = MakeQuery(@params.Filter);

            var total = query.Count();

            var todos = await query
                        .Skip((@params.PaginationParams.Page - 1) * @params.PaginationParams.Size)
                        .Take(@params.PaginationParams.Size)
                        .AsNoTracking()
                        .ToListAsync();

            return new PaginationResult<Todo>(todos, @params.PaginationParams.Page, @params.PaginationParams.Size, total);
        }

        private IQueryable<Todo> MakeQuery(string filter)
        {
            var query = _context.Todos
                                .OrderBy(t => t.Id)
                                .AsQueryable();

            if (!String.IsNullOrEmpty(filter)) {
                query = query.Where(t => t.Title.ToLower().Contains(filter.ToLower()) || t.Content.ToLower().Contains(filter.ToLower()));
            }

            return query;
        }
    }
}