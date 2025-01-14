﻿using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.CategoryHandlers
{
    public class GetCategoryQueryHandler
    {
        private readonly IRepository<Category> _repository;

        public GetCategoryQueryHandler(IRepository<Category> repository)
        {
            _repository = repository;
        }
        public async Task<List<Category>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new Category
            {
                CategoryID = x.CategoryID,
                CategoryName = x.CategoryName,
            }).ToList();
        }
    }
}
