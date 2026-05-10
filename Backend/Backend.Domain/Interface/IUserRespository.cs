using Group8Backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group8Backend.Domain.Interface
{
    public interface IUserRespository
    {
        public Task<string> InsertUser(UserModel user);
        public Task<IEnumerable<UserModel>> GetAllUsers();

        public Task<UserModel> GetUserByEmailAndPassword(string email, string password);
    }
}
