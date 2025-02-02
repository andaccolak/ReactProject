using Application.Features.CQRS.Queries.ProductQueries;
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
    public class GetProductByIdQueryHandler
    {
        private readonly IRepository<Product> _repository;

        public GetProductByIdQueryHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task<GetProductByIdQueryResult> Handle(GetProductByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetProductByIdQueryResult
            {
                ProductID = values.ProductID,
                ProductName = values.ProductName,
                Description = values.Description,
                Image = values.Image,
                CategoryID = values.CategoryID,
                CategoryName = values.CategoryName,
                Brand = values.Brand,
                Sales = values.Sales,
                Quantity = values.Quantity,
                Gram = values.Gram,
                paketIciAdet = values.paketIciAdet,
                KoliIciAdet = values.KoliIciAdet,
                AdetFiyat = values.AdetFiyat,
                BarkodNo = values.BarkodNo
            };
}
    }
}
