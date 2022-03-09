using System;
using System.Collections.Generic;
using AutoMapper;
using BusinessLayer.Mappings;
using BusinessLayer.Services.Todos;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLayer
{
    public static class BusinessLayerExtensions
    {
        public static IServiceCollection AddBusinessLayer(this IServiceCollection services)
        {
            if (services is null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            var profileList = new List<Profile>();

            profileList.Add(new MappingTodos());

            services.AddScoped<ITodoService, TodoService>();

            services.AddAutoMapper(c => c.AddProfiles(profileList), typeof(List<Profile>));
            
            
            return services;
        }
    }
}
