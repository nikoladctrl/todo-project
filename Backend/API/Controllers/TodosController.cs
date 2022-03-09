using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Services.Todos;
using Core.DTOs;
using Core.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TodosController : BaseApiController
    {
        private readonly ITodoService _todoService;
        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpPost]
        public async Task<ActionResult<TodoDto>> CreateTodo([FromBody] CreateTodoDto createTodoDto)
        {
            var todo = await _todoService.CreateTodo(createTodoDto);

            return (todo == null) ?
                NotFound() :
                Created("Todo is successfully created!", todo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDto>> UpdateTodo([FromRoute] int id, [FromBody] UpdateTodoDto updateTodoDto)
        {
            if (id != updateTodoDto.Id) {
                return BadRequest("Ids are not the same!");
            }
            var todo = await _todoService.UpdateTodo(updateTodoDto);

            return (todo == null) ?
                NotFound() :
                Ok(todo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo([FromRoute] int id)
        {
            await _todoService.DeleteTodo(id);

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResult<TodoDto>>> GetTodos([FromQuery] PaginationParams @params)
        {
            var todos = await _todoService.GetTodos(@params);

            return (todos == null || todos.Items.Count == 0) ?
                NotFound() :
                Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo([FromRoute] int id)
        {
            var todo = await _todoService.GetTodo(id);

            return (todo == null) ?
                NotFound() :
                Ok(todo);
        }
    }
}