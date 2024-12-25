using Application.Features.CQRS.Queries.CategoryQueries;
using Application.Features.CQRS.Queries.ProductQueries;
using Application.Features.CQRS.Results.CategoryResult;
using Application.Features.CQRS.Results.ProductResult;
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.CategoryHandlers
{
    public class GetCategoryByIdQueryHandler
    {
        private readonly IRepository<Category> _repository;

        public GetCategoryByIdQueryHandler(IRepository<Category> repository)
        {
            _repository = repository;
        }
        public async Task<GetCategoryByIdQueryResult> Handle(GetCategoryByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetCategoryByIdQueryResult
            {
                CategoryID = values.CategoryID,
                CategoryName = values.CategoryName,
               
            };
        }
    }
}
   
