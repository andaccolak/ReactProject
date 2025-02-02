using Application.Features.CQRS.Results.ProductResult;
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.ProductHandlers
{
    public class GetBestSellerProductQueryHandler
    {
        private readonly IProductRepository _productRepository;

        public GetBestSellerProductQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public List<GetBestSellerProductsQueryResult> Handle()
        {
            var values = _productRepository.GetBestSellerProducts();
            return values.Select(x => new GetBestSellerProductsQueryResult
            {
                ProductID = x.ProductID,
                ProductName = x.ProductName,
                Quantity = x.Quantity,
                Description = x.Description,
                Image = x.Image,
                CategoryID = x.CategoryID,
                CategoryName = x.CategoryName,
                Brand = x.Brand,
                SalesType = x.SalesType,
                Sales = x.Sales,
                Gram = x.Gram,
                paketIciAdet = x.paketIciAdet,
                KoliIciAdet = x.KoliIciAdet,
                AdetFiyat = x.AdetFiyat,
                BarkodNo = x.BarkodNo
            }).ToList();
        }
    }
}
