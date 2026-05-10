//using Group8Backend.Domain.Entities;
//using Group8Backend.Service.Interface;
//using Group8Backend.Shared.Model;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace Group8Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class OrganizationController : ControllerBase
//    {
//        private readonly IOrganizationService _organizationService;

//        public OrganizationController(IOrganizationService organizationService)
//        {
//            _organizationService = organizationService;
//        }



//        [HttpPost("AddOrganization")]
//        public async Task<IActionResult> CreateOrganization([FromBody] OrganizationModelDto organizationDto)
//        {
//            if (organizationDto == null)
//            {
//                return BadRequest(new {success=false, message="Provide all information"});
//            }

//            var result = await _organizationService.CreateOrganizationAsync(organizationDto);

//            if(result == "Successfully Inserted Organization")
//            {
//                return Ok(new { success = true, message = result });
//            }

//            return BadRequest(new {success=false, message=result});

            
//        }



//        [HttpGet("GetOrganizationsWithAddresses")]
//        public async Task<IActionResult> GetOrganizationsWithAddresses()
//        {
//            try
//            {
//                var organizations = await _organizationService.GetOrganizationsWithAddressesAsync();

//                if (organizations == null)
//                {
//                    return NotFound(new { success = false, message = "Organizations not found" });
//                }

//                return Ok(new { success = true, message = "Organizations found", data = organizations });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Error getting organizations" });
//            }
//        }



//        [HttpPost("ToggleOrganizationIsActive/{organizationId}")]
//        public async Task<IActionResult> ToggleOrganizationIsActive(int organizationId)
//        {
//            try
//            {
//                var organization = await _organizationService.GetOrganizationByIdAsync(organizationId);

//                if (organization == null)
//                {
//                    return NotFound(new { success = false, message = "Organization not found" });
//                }

//                organization.IsActive = !organization.IsActive;

//                await _organizationService.UpdateOrganizationAsync(organization);

//                return Ok(new { success = true, message = $"Organization IsActive status toggled to {organization.IsActive}" });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Error toggling IsActive status" });
//            }
//        }
//    }
//}
