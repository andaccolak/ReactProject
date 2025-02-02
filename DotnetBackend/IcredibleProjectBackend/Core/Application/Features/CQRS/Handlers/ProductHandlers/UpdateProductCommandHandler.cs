using Application.Features.CQRS.Commands.ProductCommands;
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.ProductHandlers
{
    public class UpdateProductCommandHandler
    {
        private readonly IRepository<Product> _repository;

        public UpdateProductCommandHandler(IRepository<Product> repository)
        {
            _repository = repository;
        }
        public async Task Handle(UpdateProductCommand command)
        {
            var values = await _repository.GetByIdAsync(command.ProductID);
            values.Description = command.Description;
            values.Image = command.Image;
            values.ProductName = command.ProductName;
            values.CategoryID = command.CategoryID;
            values.CategoryName = command.CategoryName;
            values.Brand = command.Brand;
            values.SalesType = command.SalesType;
            values.Sales = command.Sales;
            values.Quantity = command.Quantity;
            values.Gram = command.Gram;
            values.paketIciAdet = command.paketIciAdet;
            values.KoliIciAdet = command.KoliIciAdet;
            values.AdetFiyat = command.AdetFiyat;
            values.BarkodNo = command.BarkodNo;

            await _repository.UpdateAsync(values);
        }
    }
}
