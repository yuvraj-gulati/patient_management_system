using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Shared.Model
{
    public class PatientDto
    {
        public int? Id { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientLastName { get; set; }
        public string PatientMobileNumber { get; set; }
        public string PatientCountry { get; set; }
        public string PatientState { get; set; }
        public string PatientStreetAddress { get; set; }
        public string PatientGender { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public DateTime? ModifiedDate { get; set; }
        public bool? IsDeleted { get; set; } = false;
        public bool? IsActive { get; set; } = true;
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
