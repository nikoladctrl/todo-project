using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using EFCore.Context;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EFCore.Seeders
{
    public class DbSeeder
    {
        public static void Initialize(DataContext context, IServiceProvider services)
        {
            // Get a logger
            var logger = services.GetRequiredService<ILogger<DbSeeder>>();

            // Make sure the database is created
            // We already did this in the previous step
            context.Database.EnsureCreated();

            if (context.Todos.Count() > 10)
            {
                logger.LogInformation("The database was already seeded");
                return;
            }

            logger.LogInformation("Start seeding the database.");

            for(var i = 0; i < 20; i ++)
            {
                context.Todos.Add(new Todo() { Title = "Task no." + (i + 1), Content = "Task content no. " + (i+1) });
            }

            context.Todos.Add(new Todo() { Title = "Special task 1", Content = "Special content 1"});
            context.Todos.Add(new Todo() { Title = "Another special task", Content = "Another special task's content 2"});

            context.SaveChanges();

            logger.LogInformation("Finished seeding the database.");
        }
    }
}