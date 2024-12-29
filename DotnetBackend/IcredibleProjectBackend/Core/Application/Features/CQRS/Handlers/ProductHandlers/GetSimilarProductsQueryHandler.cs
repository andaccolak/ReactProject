using Application.Features.CQRS.Results.ProductResult;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.ProductHandlers
{
    public class GetSimilarProductsQueryHandler
    {
        private readonly IProductRepository _productRepository;

        public GetSimilarProductsQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public List<GetSimilarProductsQueryResult> Handle(int categoryId)
        {
            var products = _productRepository.GetProductsByCategory(categoryId);

            var result = products.Select(p => new GetSimilarProductsQueryResult
            {
                ProductID = p.ProductID,
                ProductName = p.ProductName,
                Price = p.Price,
                Quantity = p.Quantity,
                Description = p.Description,
                Image = p.Image,
                CategoryID = p.CategoryID,
                CategoryName = p.CategoryName,
                Brand = p.Brand,
                SalesType = p.SalesType,
                Sales = p.Sales
            }).ToList();

            return result;
        }
    }
}