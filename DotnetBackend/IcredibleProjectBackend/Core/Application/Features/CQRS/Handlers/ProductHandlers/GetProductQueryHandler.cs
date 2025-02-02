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
    public class GetProductQueryHandler
    {
        private readonly IRepository<Product> _repository;

        public GetProductQueryHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task<List<GetProductQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new GetProductQueryResult
            {
                ProductID = x.ProductID,
                ProductName = x.ProductName,
                Description = x.Description,
                Image = x.Image,
                CategoryID = x.CategoryID,
                CategoryName = x.CategoryName,
                Brand = x.Brand,
                SalesType = x.SalesType,
                Sales = x.Sales,
                Quantity = x.Quantity,
                Gram = x.Gram,
                paketIciAdet = x.paketIciAdet,
                KoliIciAdet = x.KoliIciAdet,
                AdetFiyat = x.AdetFiyat,
                BarkodNo = x.BarkodNo

            }).ToList();
        }
    }
}
