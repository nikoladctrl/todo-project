using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class PaginationResult<T> where T: class
    {
        public List<T> Items { get; set; }
        public PaginationParams Pagination { get; set; }
        public FilteringParams FilteringParams { get; set; }
        
        public PaginationResult()
        {
        }

        public PaginationResult(List<T> items, int page, int size, int total)
        {
            Items = items;
            Pagination = new PaginationParams(page, size, total);
        }

        public PaginationResult(List<T> items, int page, int size, int total, FilteringParams filteringParams)
        {
            Items = items;
            Pagination = new PaginationParams(page, size, total);
            FilteringParams = filteringParams;
        }
    }
}