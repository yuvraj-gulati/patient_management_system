using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Domain.Entities
{
    public class PatientModel:BaseEntity
    {
        public int Id { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientLastName { get; set; }
        public string PatientMobileNumber { get; set; }
        public string PatientCountry { get; set; }
        public string PatientState { get; set; }
        public string PatientStreetAddress { get; set; }
        public string PatientGender { get; set; }
    }
}
