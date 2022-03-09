using System;
using EFCore.Context;
using EFCore.Repositories.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EFCore
{
    public static class EFCoreExtensions
    {
        public static IServiceCollection AddEFCore(
                this IServiceCollection services,
                Action<DbContextOptionsBuilder> dboptions,
                ServiceLifetime scope = ServiceLifetime.Scoped)
        {
            
            services.AddDbContext<DataContext>(dboptions, ServiceLifetime.Transient);

            services.AddScoped<ITodoRepository, TodoRepository>();
            // services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            // services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            // services.AddScoped<IBusinessRepository, BusinessRepository>();
            
            return services;
        }
    }
}
