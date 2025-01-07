using Application.Features.CQRS.Commands.CategoryCommands;
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Handlers.CategoryHandlers
{
    public class DeleteCategoryCommandHandler
    {
        private readonly IRepository<Category> _repository;

        public DeleteCategoryCommandHandler(IRepository<Category> repository)
        {
            _repository = repository;
        }
        public async Task Handle(DeleteCategoryCommand command)
        {
            var value = await _repository.GetByIdAsync(command.Id);
            await _repository.DeleteAsync(value);

        }
    }
}
