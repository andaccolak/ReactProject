using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Application.Interfaces;
using Persistence.Context;

namespace Persistence.Repositories.ProductRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DatabaseContext _context;

        public ProductRepository(DatabaseContext context)
        {
            _context = context;
        }

        public List<Product> GetBestSellerProducts()
        {
            var values = _context.Products.OrderByDescending(x => x.Sales).Take(9).ToList();
            return values;
        }

        public List<Product> GetProductsByCategory(int categoryId)
        {
            return _context.Products
                .Where(p => p.CategoryID == categoryId)
                .ToList();
        }

    }
}
