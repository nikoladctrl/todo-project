using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class PaginationWithFiltersDto
    {
        public PaginationParams PaginationParams { get; set; }
        public string Filter { get; set; }
    }
}