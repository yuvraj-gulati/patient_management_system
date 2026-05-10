using Group8Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Domain.Interface
{
    public interface IPatientRepository
    { 

        public (IEnumerable<PatientModel>, int) GetPatientsPaged(PaginationSearchDto dto);

        public Task<bool> RegisterPatient(PatientModel patientDetails);

        public Task<IEnumerable<PatientModel>> GetAllPatients();

        public Task<bool> UpdatePatient(PatientModel patientDetails);

        public Task<bool> DeletePatient(int patientId);
    }
}

