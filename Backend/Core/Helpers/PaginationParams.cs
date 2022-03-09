using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public class PaginationParams
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public int? NumberOfPages { get; set; }
        public int? Total { get; set; }
        public bool? HasPrevious => Page > 1;
        public bool? HasNext => Page < NumberOfPages;


        public PaginationParams()
        {
        }

        public PaginationParams(int page, int size, int total)
        {
            Page = page;
            Size = size;
            Total = total;
            NumberOfPages = (int)Math.Ceiling(total / (double) size);
        }
    }
}