using Application.Features.CQRS.Commands.CategoryCommands;
using Application.Features.CQRS.Commands.ProductCommands;
using Application.Features.CQRS.Handlers.CategoryHandlers;
using Application.Features.CQRS.Handlers.ProductHandlers;
using Application.Features.CQRS.Queries.CategoryQueries;
using Application.Features.CQRS.Queries.ProductQueries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly GetCategoryQueryHandler _getCategoryQueryHandler;
        private readonly GetCategoryByIdQueryHandler _getCategoryByIdQueryHandler;
        private readonly CreateCategoryCommandHandler _createCategoryCommandHandler;
        private readonly DeleteCategoryCommandHandler _deleteCategoryCommandHandler;
        private readonly UpdateCategoryCommandHandler _updateCategoryCommandHandler;

        public CategoryController(GetCategoryQueryHandler getCategoryQueryHandler, GetCategoryByIdQueryHandler getCategoryByIdQueryHandler, CreateCategoryCommandHandler createCategoryCommandHandler, DeleteCategoryCommandHandler deleteCategoryCommandHandler, UpdateCategoryCommandHandler updateCategoryCommandHandler)
        {
            _getCategoryQueryHandler = getCategoryQueryHandler;
            _getCategoryByIdQueryHandler = getCategoryByIdQueryHandler;
            _createCategoryCommandHandler = createCategoryCommandHandler;
            _deleteCategoryCommandHandler = deleteCategoryCommandHandler;
            _updateCategoryCommandHandler = updateCategoryCommandHandler;
        }

        [HttpGet("list")]
        public async Task<IActionResult> CategoryList()
        {
            var values = await _getCategoryQueryHandler.Handle();
            return Ok(values);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var value = await _getCategoryByIdQueryHandler.Handle(new GetCategoryByIdQuery(id));
            return Ok(value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryCommand command)
        {
            await _createCategoryCommandHandler.Handle(command);
            return Ok("Kategori Eklendi");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _deleteCategoryCommandHandler.Handle(new DeleteCategoryCommand(id));
            return Ok("Kategori Silindi");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategoryCommand command)
        {
            await _updateCategoryCommandHandler.Handle(command);
            return Ok("Kategori Güncellendi");
        }

    }
}
