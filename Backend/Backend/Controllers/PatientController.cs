using Group8Backend.Service.Interface;
using Group8Backend.Shared.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using OfficeOpenXml;
using System.Data;

namespace Group8_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        public PatientController(IPatientService patientService) 
        {
            _patientService = patientService;
        }

        private readonly string _connectionString = "Server=DESKTOP-AI5O62S\\SQLEXPRESS;Database=yuvraj;Integrated Security=True;TrustServerCertificate=True;MultipleActiveResultSets=true;";

     /*   private readonly string _connectionString = "Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True;TrustServerCertificate=True;";*/

        [HttpGet("Pagination")]
        public IActionResult GetPatientsPaged([FromQuery] PaginationSearchDto dto)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var command = new SqlCommand("GetRecords_Yuvi_PatientsDb", connection);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@PageNumber", dto.pageNumber);
                command.Parameters.AddWithValue("@PageSize", dto.pageSize);
                command.Parameters.AddWithValue("@SearchText", dto.searchText);

                SqlDataReader reader = command.ExecuteReader();

                List<PatientDto> patients = new List<PatientDto>();
                int totalRecords = 0;

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        patients.Add(new PatientDto
                        {
                            Id = (int)reader["Id"],
                            PatientFirstName = (string)reader["PatientFirstName"],
                            PatientLastName = (string)reader["PatientLastName"],
                            PatientMobileNumber = (string)reader["PatientMobileNumber"],
                            PatientCountry = (string)reader["PatientCountry"],
                            PatientState = (string)reader["PatientState"],
                            PatientStreetAddress = (string)reader["PatientStreetAddress"],
                            PatientGender = (string)reader["PatientGender"],
                            IsActive = (bool)reader["IsActive"]
                        });
                    }

                    if (reader.NextResult())
                    {
                        if (reader.Read())
                        {
                            totalRecords = (int)reader["TotalRecords"];
                        }
                    }
                }

                return Ok(new { patients, totalRecords });
            }
        }




        [HttpPost("RegisterPatient")]
        public async Task<IActionResult> RegisterPatient([FromBody] PatientDto patientDetails)
        {
            var res = await _patientService.AddPatient(patientDetails);

            if(res == true)
            {
                return Ok(new { success = true, message = "Successfully Add Patient" });
            }

            return BadRequest(new { success = false, message = "Internal Server Error" });
        }




        [HttpGet("GetAllPatients")]
        public async Task<IActionResult> GetAllPatients()
        {
            var res = await _patientService.GetAllRegisteredPatients();
            

            if(res == null)
            {
                BadRequest(new {success=false, message ="Internal Server Error"});
            }

            return Ok(new {success=true, message="successfully fetched patients" , records = res});
        }



        [HttpPut("UpdatePatientDetails")]
        public async Task<IActionResult> UpdatePatientDetails(PatientDto patientDetails)
        {
            try
            {
                var response = await _patientService.UpdatePatientDetails(patientDetails);

                return Ok(new { statuscode = StatusCodes.Status200OK, success = true, message = "successfully updated patient details" });
            }
            catch (Exception ex)
            {
                var err = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "err" });
            }

        }




        [HttpDelete("RemovePatientRecord/{patientId}")]
        public async Task<IActionResult> RemovePatientRecord(int patientId)
        {
            var res = await _patientService.RemovePatientRecord(patientId);

            if(res == true)
            {
                return Ok(new { success = true, message = "Successfully Removed Patient Record" });
            }

            return StatusCode(500, "Internal Server Error");

           
        }







      /// <summary>
      /// Generates Excel file for patient details
      /// </summary>
      /// <returns> xlsx file with default headers </returns>

        [HttpGet("GenerateExcel")]
        public async Task<IActionResult> GenerateExcel()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Patient");

                worksheet.Cells[1, 1].Value = "FirstName";
                worksheet.Cells[1, 2].Value = "LastName";
                worksheet.Cells[1, 3].Value = "PhoneNumber";
                worksheet.Cells[1, 4].Value = "Address";
                worksheet.Cells[1, 5].Value = "Gender";
                worksheet.Cells[1, 6].Value = "Country";
                worksheet.Cells[1, 7].Value = "State";

                string fileName = "PatientTemplate.xlsx";
                string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                return File(package.GetAsByteArray(), contentType, fileName);
            }
        }




        [HttpPost("UploadExcel")]
        public async Task<IActionResult> UploadExcel(IFormFile file)

        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file was uploaded.");
            }

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                    if (worksheet == null)
                    {
                        return BadRequest("No worksheet found in the Excel file.");
                    }

                    var patients = new List<PatientDto>();

                    for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                    {
                        var patient = new PatientDto
                        {
                            PatientFirstName = worksheet.Cells[row, 1].Value?.ToString(),
                            PatientLastName = worksheet.Cells[row, 2].Value?.ToString(),
                            PatientMobileNumber = worksheet.Cells[row, 3].Value?.ToString(),
                            PatientStreetAddress = worksheet.Cells[row, 4].Value?.ToString(),
                            PatientGender = worksheet.Cells[row, 5].Value?.ToString(),
                            PatientCountry = worksheet.Cells[row, 6].Value?.ToString(),
                            PatientState = worksheet.Cells[row, 7].Value?.ToString()
                        };
                        patients.Add(patient);
                    }

                    var result = await _patientService.SavePatientsFromFile(patients);

                    if(result == true)
                    {
                        return Ok(new { success = true, message = "Successfully Removed Patient Record" });
                    }

                    return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Error Patient Details Saving" });

                }
            }
        }



    }
}

