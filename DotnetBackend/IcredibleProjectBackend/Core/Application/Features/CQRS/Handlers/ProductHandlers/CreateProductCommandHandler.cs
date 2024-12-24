using Application.Features.CQRS.Commands.ProductCommands;
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.ProductHandlers
{
    public class CreateProductCommandHandler
    {
        private readonly IRepository<Product> _repository;

        public CreateProductCommandHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task Handle(CreateProductCommand command)
        {
            await _repository.CreateAsync(new Product
            {
                ProductName = command.ProductName,
                Price = command.Price,
                Description = command.Description,
                Image = command.Image,
                CategoryID = command.CategoryID,
                CategoryName = command.CategoryName,
                Brand = command.Brand,
                SalesType = command.SalesType,
                Sales = command.Sales,
                Quantity = command.Quantity
            });
        }
    }
}
