using Group8Backend.Service.Interface;
using Group8Backend.Shared.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Group8Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost("RegisterUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserModelDto userModelDto)
        {
            //If validation of usermodeldto failed
            if (!ModelState.IsValid)
            {
                return BadRequest(new { success = false, message = "Validation erros occurred" , Data = ModelState });
            }

            var result = await _userService.AddUser(userModelDto);
            // Check the result and return appropriate status
            if (result == "User created successfully")
            {
                return Ok(new { success = true, message = result });
            }
            else
            {
                return BadRequest(new { success = false, message = result });
            }
        }



        [HttpPost("LoginUser")]
        public async Task<IActionResult> Login(UserCredentialModel userCredential)
        {
            var user = await _userService.Authenticate(userCredential.Email, userCredential.Password);

            if (user == null)
            {
                return Unauthorized(new { success = false, message = "Invalid credentials" });
            }

            return Ok(new { success = true, message = "Successfully Logged In" });
        }




        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsers();
                return Ok(new { success = true, data = users });
            }
            catch (Exception ex)
            {
                //If error occured in fetching the users it will send error to angular
                return StatusCode(500, new { success = false, message = "An error occurred while fetching users", details = ex.Message });
            }
        }

    }
}
