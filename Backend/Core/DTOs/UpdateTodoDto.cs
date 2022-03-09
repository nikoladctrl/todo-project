using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class UpdateTodoDto : CreateTodoDto
    {
        public int Id { get; set; }
        public bool Completed { get; set; }
    }
}