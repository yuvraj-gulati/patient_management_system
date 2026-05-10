using Group8Backend.Domain.Entities;
using Group8Backend.Domain.Interface;
using Group8Backend.Service.Interface;
using Group8Backend.Shared.Model;
using Mapster;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Service.Implementation
{
    public class UserService: IUserService
    {
        private readonly IUserRespository _userRepository;
        public UserService(IUserRespository IUserRepository) { 
            _userRepository = IUserRepository;
        }

        public async Task<string> AddUser(UserModelDto userDto)
        {
            var userEntity = userDto.Adapt<UserModel>();

            var result = await _userRepository.InsertUser(userEntity);
            return result;
        }




        public async Task<UserModel> Authenticate(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAndPassword(email, password);


          /*  var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"], // Add this line
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);*/




            return user;
        }



        public async Task<IEnumerable<UserModelDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();

            //We are returning the mapped userModelDto beacuse repository returns entity type , So we have to mapster
            return users.Adapt<IEnumerable<UserModelDto>>();
        }

    }

}
