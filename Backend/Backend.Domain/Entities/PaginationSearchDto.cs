using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Domain.Entities
{
    public class PaginationSearchDto
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public string searchText { get; set; }
    }
}
