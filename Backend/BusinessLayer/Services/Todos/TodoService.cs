using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Helpers;
using EFCore.Repositories.Todos;

namespace BusinessLayer.Services.Todos
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;
        public TodoService(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        public async Task<TodoDto> CreateTodo(CreateTodoDto createTodoDto)
        {
            return _mapper.Map<TodoDto>(await _todoRepository.CreateTodo(_mapper.Map<Todo>(createTodoDto)));
        }

        public async Task<TodoDto> UpdateTodo(UpdateTodoDto updateTodoDto)
        {
            var todo = await _todoRepository.GetTodo(updateTodoDto.Id);
            var todoToUpdate = _mapper.Map<UpdateTodoDto, Todo>(updateTodoDto, todo);
            return _mapper.Map<TodoDto>(await _todoRepository.UpdateTodo(todoToUpdate));
        }

        public async Task DeleteTodo(int id)
        {
            await _todoRepository.DeleteTodo(id);
        }

        public async Task<PaginationResult<TodoDto>> GetTodos(Params @params)
        {
            return _mapper.Map<PaginationResult<TodoDto>>(await _todoRepository.GetTodos(@params));
        }

        public async Task<TodoDto> GetTodo(int id)
        {
            return _mapper.Map<TodoDto>(await _todoRepository.GetTodo(id));
        }
    }
}