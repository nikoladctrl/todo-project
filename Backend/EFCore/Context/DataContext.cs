using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace EFCore.Context
{
    public class DataContext : DbContext
    {
        public DbSet<Todo> Todos { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Todo>()
                .Property(t => t.CreatedOn).HasDefaultValueSql("date('now')");

            modelBuilder.Entity<Todo>()
                .Property(t => t.Completed).HasDefaultValue(false);                
        }
    }
}