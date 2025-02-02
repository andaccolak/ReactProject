using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence.Context
{
    public class DatabaseContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // RDS endpoint + bağlantı bilgileri
            //optionsBuilder.UseSqlServer(
            //    "Server=database-1.cxsk828guz60.eu-north-1.rds.amazonaws.com,1433;" +
            //    "Initial Catalog=keytedarik;" +
            //    "User ID=admin;" +
            //    "Password=An8233dac;" +
            //    "Encrypt=True;" +
            //    "TrustServerCertificate=True;"
            //);


  //          optionsBuilder.UseSqlServer(
  //"Server=2.59.119.221,1433;Database=colak;User ID=adminandac;Password=An8233dac!;"
//);


            optionsBuilder.UseSqlServer("Server=ANDACCOLAK;initial Catalog=KeyTedarikDB;integrated Security=true;TrustServerCertificate=True;");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Support> Supports { get; set; }
    }
}
