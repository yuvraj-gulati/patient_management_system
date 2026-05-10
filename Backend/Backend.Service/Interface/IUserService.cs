using Group8Backend.Domain.Entities;
using Group8Backend.Shared.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Service.Interface
{
    public interface IUserService
    {
        public Task<string> AddUser(UserModelDto userDto);
        public Task<IEnumerable<UserModelDto>> GetAllUsers();

        public Task<UserModel> Authenticate(string email, string password);
    }
}
