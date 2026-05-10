using Group8Backend.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Service.Interface
{
    public interface IPatientService
    {
        public Task<bool> AddPatient(PatientDto patient);

        public Task<IEnumerable<PatientDto>> GetAllRegisteredPatients();

        public Task<bool> UpdatePatientDetails(PatientDto patientDetails);

        public  Task<bool> RemovePatientRecord(int patientId);

        public  Task<bool> SavePatientsFromFile(List<PatientDto> patients);
    }
}
