//using Group8Backend.Domain.Entities;
//using Group8Backend.Domain.Implementation;
//using Group8Backend.Domain.Interface;
//using Group8Backend.Service.Interface;
//using Group8Backend.Shared.Model;
//using Mapster;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Group8Backend.Service.Implementation
//{
//    public class OrganizationService : IOrganizationService
//    {
//        private readonly IOrganizationRespository _organizationRespository;
//        public OrganizationService(IOrganizationRespository organizationRespository) {
//            _organizationRespository = organizationRespository;
//        }

//        public async Task<string> CreateOrganizationAsync(OrganizationModelDto organizationDto)
//        {
//            var organization = new OrganizationModel
//            {
//                OrganizationName = organizationDto.OrganizationName,
//                BusinessKey = organizationDto.BusinessKey,
//                OrganizationEmail = organizationDto.OrganizationEmail,
//                OrganizationMobileNumber = organizationDto.OrganizationMobileNumber,
//                OrganizationFaxNumber = organizationDto.OrganizationFaxNumber,
//                OrganizationAddressList = organizationDto.OrganizationAddressList.Select(a => new OrganizationAddressModel
//                {
//                    Organization_Country = a.Organization_Country,
//                    Organization_State = a.Organization_State,
//                    Organization_City = a.Organization_City,
//                    Organization_Street = a.Organization_Street
//                }).ToList()
//            };

//            return await _organizationRespository.AddOrganizationAsync(organization);
//        }


//        public async Task<List<OrganizationModelDto>> GetOrganizationsWithAddressesAsync()
//        {
//            var result = await _organizationRespository.GetOrganizationsWithAddressesAsync();
//            var res = result.Adapt<List<OrganizationModelDto>>();
//            return res;
//        }


//        public async Task<OrganizationModelDto> GetOrganizationByIdAsync(int organizationId)
//        {
//            var res = await _organizationRespository.GetOrganizationByIdAsync(organizationId);
//            return res.Adapt<OrganizationModelDto>();
//        }

//        public async Task UpdateOrganizationAsync(OrganizationModelDto organization)
//        {
//            var entityTypeData = organization.Adapt<OrganizationModel>();
//            await _organizationRespository.UpdateOrganizationAsync(entityTypeData);
//        }
//    }
//}
