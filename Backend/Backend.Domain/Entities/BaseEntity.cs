using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Domain.Entities
{
    public  class BaseEntity
    {
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsDeleted { get; set; } = false;
        public bool? IsActive { get; set; }  = true;
        public string? CreatedBy { get; set; } 
        public string? ModifiedBy { get; set; }
    }
}