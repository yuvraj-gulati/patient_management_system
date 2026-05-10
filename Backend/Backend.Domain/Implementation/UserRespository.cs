using Group8Backend.Domain.Entities;
using Group8Backend.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Group8Backend.Domain.ApplicationDbContextt;
using Microsoft.EntityFrameworkCore;
namespace Group8Backend.Domain.Implementation
{
    public class UserRespository : IUserRespository
    {
        private readonly ApplicationDbContext _dbContext;
        public UserRespository(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }


        public async Task<string> InsertUser(UserModel user)
        {
            try
            {
                // Saving the user in db
                _dbContext.Yuvi_User.Add(user);
                await _dbContext.SaveChangesAsync();

                return "User created successfully";
            }
            catch (Exception ex)
            {
                return $"Failed to create user: {ex.Message}";
            }
        }


        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            var users = await _dbContext.Yuvi_User.ToListAsync();
            return users;
        }

        public async Task<UserModel> GetUserByEmailAndPassword(string email, string password)
        {
            //Returns null if user not found in db
            return await _dbContext.Yuvi_User.FirstOrDefaultAsync(u => u.UserEmail == email && u.UserPassword == password);
        }

    }
}
