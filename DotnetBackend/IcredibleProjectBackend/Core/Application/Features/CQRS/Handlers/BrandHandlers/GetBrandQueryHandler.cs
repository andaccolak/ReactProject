using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.BrandHandlers
{
    public class GetBrandQueryHandler
    {
        private readonly IRepository<Brand> _repository;

        public GetBrandQueryHandler(IRepository<Brand> repository)
        {
            _repository = repository;
        }
        public async Task<List<Brand>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new Brand
            {
                BrandID = x.BrandID,
                BrandName = x.BrandName,
            }).ToList();
        }
    }
}
