using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class CreateTodoDto
    {
        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Content { get; set; }
    }
}