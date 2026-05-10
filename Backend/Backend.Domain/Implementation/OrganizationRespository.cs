//using Group8Backend.Domain.ApplicationDbContextt;
//using Group8Backend.Domain.Entities;
//using Group8Backend.Domain.Interface;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Text;
//using System.Threading.Tasks;

//namespace Group8Backend.Domain.Implementation
//{
//    public class OrganizationRespository : IOrganizationRespository
//    {
//        private readonly ApplicationDbContext _dbContext;
//        public OrganizationRespository(ApplicationDbContext dbContext)
//        {
//            _dbContext = dbContext;
//        }



//        public async Task<string> AddOrganizationAsync(OrganizationModel organization)
//        {
//            try
//            {
//                _dbContext.Yuvi_Organizations.Add(organization);
//                await _dbContext.SaveChangesAsync();
//                return "Successfully Inserted Organization";
//            }
//            catch (Exception ex)
//            {
//                return $"Failed to create user: {ex.Message}";
//            }
//        }




//        public async Task<List<OrganizationModel>> GetOrganizationsWithAddressesAsync()
//        {
//            var result =  await _dbContext.Yuvi_Organizations
//                .Include(o => o.OrganizationAddressList)
//                .Select(o => new OrganizationModel
//                {
//                    Id = o.Id,
//                    OrganizationName = o.OrganizationName,
//                    BusinessKey = o.BusinessKey,
//                    OrganizationEmail = o.OrganizationEmail,
//                    OrganizationMobileNumber = o.OrganizationMobileNumber,
//                    OrganizationFaxNumber = o.OrganizationFaxNumber,
//                    IsActive = o.IsActive,
//                    OrganizationAddressList = o.OrganizationAddressList.Select(a => new OrganizationAddressModel
//                    {
//                        Id = a.Id,
//                        Organization_Country = a.Organization_Country,
//                        Organization_State = a.Organization_State,
//                        Organization_City = a.Organization_City,
//                        Organization_Street = a.Organization_Street
//                    }).ToList()
//                })
//                .ToListAsync();

//            return result;
//        }




//        public async Task<OrganizationModel> GetOrganizationByIdAsync(int organizationId)
//        {
//            var res = await _dbContext.Yuvi_Organizations.AsNoTracking()
//                     .Include(o => o.OrganizationAddressList)
//                     .FirstOrDefaultAsync(o => o.Id == organizationId);

//            return res;
//        }



//        public async Task UpdateOrganizationAsync(OrganizationModel organization)
//        {
//            _dbContext.Entry(organization).State = EntityState.Modified;
//            await _dbContext.SaveChangesAsync();
//        }

//    }
//}
