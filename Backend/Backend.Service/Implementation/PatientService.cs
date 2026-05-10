using Group8Backend.Domain.Entities;
using Group8Backend.Domain.Implementation;
using Group8Backend.Domain.Interface;
using Group8Backend.Service.Interface;
using Group8Backend.Shared.Model;
using Mapster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Service.Implementation
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _repository;
        public PatientService(IPatientRepository repository) {
            _repository = repository;
        }

        public async Task<bool> AddPatient(PatientDto patient)
        {
            var patientEntityType = patient.Adapt<PatientModel>();
            return await _repository.RegisterPatient(patientEntityType);
        }



        public async Task<IEnumerable<PatientDto>> GetAllRegisteredPatients()
        {
            var res = await _repository.GetAllPatients();
            return res.Adapt<IEnumerable<PatientDto>>();
        }



        public async Task<bool> UpdatePatientDetails(PatientDto patientDetails)
        {
            var patientDetailsEntity = patientDetails.Adapt<PatientModel>();
            var res = await _repository.UpdatePatient(patientDetailsEntity);
            return res;
        }




        public async Task<bool> RemovePatientRecord(int patientId)
        {
            return await _repository.DeletePatient(patientId);
        }




        public async Task<bool> SavePatientsFromFile(List<PatientDto> patients)
        {
            var res = false;

            foreach (var patient in patients)
            {
                var patientEntity = patient.Adapt<PatientModel>();
                res = await _repository.RegisterPatient(patientEntity);
            }

            return res;
        }
    }
}
