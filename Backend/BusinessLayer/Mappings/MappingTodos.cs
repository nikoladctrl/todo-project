using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Helpers;

namespace BusinessLayer.Mappings
{
    public class MappingTodos : Profile
    {
        public MappingTodos()
        {
            CreateMap<CreateTodoDto, Todo>();
            CreateMap<UpdateTodoDto, Todo>();
            CreateMap<Todo, TodoDto>();
            CreateMap<PaginationResult<Todo>, PaginationResult<TodoDto>>();
        }
    }
}