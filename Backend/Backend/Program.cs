
using Group8Backend.Domain.ApplicationDbContextt;
using Group8Backend.Domain.Implementation;
using Group8Backend.Domain.Interface;
using Group8Backend.Service.Implementation;
using Group8Backend.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace Group8Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddMemoryCache();
            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IUserRespository, UserRespository>();

            //builder.Services.AddTransient<IOrganizationService, OrganizationService>();
            //builder.Services.AddTransient<IOrganizationRespository, OrganizationRespository>();

            builder.Services.AddTransient<IPatientService, PatientService>();
            builder.Services.AddTransient<IPatientRepository, PatientRepository>();
           

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSpecificOrigins",
                                      policy =>
                                      {
                                          policy.WithOrigins("http://localhost:4200")
                                                              .AllowAnyHeader()
                                                              .AllowAnyMethod();
                                      });
            });




            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("MyAllowSpecificOrigins");



            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}