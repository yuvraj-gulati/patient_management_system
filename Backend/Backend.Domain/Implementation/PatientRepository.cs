using Group8Backend.Domain.ApplicationDbContextt;
using Group8Backend.Domain.Entities;
using Group8Backend.Domain.Interface;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Group8Backend.Domain.Implementation
{

    public class PatientRepository : IPatientRepository
    {
        private readonly string _connectionString = "Server=DESKTOP-AI5O62S\\SQLEXPRESS;Database=yuvraj;Integrated Security=True;TrustServerCertificate=True;MultipleActiveResultSets=true;";
        private readonly ApplicationDbContext _dbContext;
        public PatientRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        public (IEnumerable<PatientModel>, int) GetPatientsPaged(PaginationSearchDto dto)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var command = new SqlCommand("GetRecords_Prashant_PatientsDb", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@PageNumber", dto.pageNumber);
                command.Parameters.AddWithValue("@PageSize", dto.pageSize);
                command.Parameters.AddWithValue("@SearchText", dto.searchText);

                SqlDataReader reader = command.ExecuteReader();

                List<PatientModel> patients = new List<PatientModel>();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        patients.Add(new PatientModel

                        {
                            Id = (int)reader["Id"],
                            PatientFirstName = (string)reader["PatientFirstName"],
                            PatientLastName = (string)reader["PatientLastName"],
                            PatientMobileNumber = (string)reader["PatientMobileNumber"],
                            PatientStreetAddress = (string)reader["PatientStreetAddress"],
                            PatientCountry = (string)reader["PatientCountry"],
                            PatientState = (string)reader["PatientState"],
                            PatientGender = (string)reader["PatientGender"]
                        });
                    }
                }

                int totalRecords = 0;

                if (reader.NextResult())
                {
                    if (reader.Read())
                    {
                        totalRecords = (int)reader["TotalRecords"];
                    }
                }

                return (patients, totalRecords);
            }
        }




        public async Task<bool> RegisterPatient(PatientModel patientDetails)
        {
            try
            {
                _dbContext.Yuvi_PatientsDb.Add(patientDetails);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }




        public async Task<IEnumerable<PatientModel>> GetAllPatients()
        {
            var res = await _dbContext.Yuvi_PatientsDb.ToListAsync();
            return res;
        }



        public async Task<bool> UpdatePatient(PatientModel patientDetails)
        {
             _dbContext.Yuvi_PatientsDb.Update(patientDetails);
            await _dbContext.SaveChangesAsync();
            return true;

        }




        public async Task<bool> DeletePatient(int patientId)
        {
            try
            {
               var record = await _dbContext.Yuvi_PatientsDb.FirstOrDefaultAsync(p => p.Id == patientId);

                _dbContext.Yuvi_PatientsDb.Remove(record);
                await _dbContext.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            
        }


    }
}
