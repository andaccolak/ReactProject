using Application.Features.CQRS.Commands.ProductCommands;
using Application.Features.CQRS.Handlers.ProductHandlers;
using Application.Features.CQRS.Queries.ProductQueries;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly CreateProductCommandHandler _createProductCommandHandler;
    private readonly DeleteProductCommandHandler _deleteProductCommandHandler;
    private readonly UpdateProductCommandHandler _updateProductCommandHandler;
    private readonly GetProductQueryHandler _getProductQueryHandler;
    private readonly GetProductByIdQueryHandler _getProductByIdQueryHandler;

    public ProductsController(CreateProductCommandHandler createProductCommandHandler,
                               DeleteProductCommandHandler deleteProductCommandHandler,
                               UpdateProductCommandHandler updateProductCommandHandler,
                               GetProductQueryHandler getProductQueryHandler,
                               GetProductByIdQueryHandler getProductByIdQueryHandler)
    {
        _createProductCommandHandler = createProductCommandHandler;
        _deleteProductCommandHandler = deleteProductCommandHandler;
        _updateProductCommandHandler = updateProductCommandHandler;
        _getProductQueryHandler = getProductQueryHandler;
        _getProductByIdQueryHandler = getProductByIdQueryHandler;
    }

    // Tüm ürünleri listelemek için benzersiz bir yol
    [HttpGet("list")]
    public async Task<IActionResult> ProductList()
    {
        var values = await _getProductQueryHandler.Handle();
        return Ok(values);
    }

    // Belirli bir ürünü ID'ye göre almak için benzersiz bir yol
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var value = await _getProductByIdQueryHandler.Handle(new GetProductByIdQuery(id));
        return Ok(value);
    }

    // Yeni bir ürün oluşturmak için benzersiz bir yol
    [HttpPost]
    public async Task<IActionResult> CreateProduct(CreateProductCommand command)
    {
        await _createProductCommandHandler.Handle(command);
        return Ok("Ürün Eklendi");
    }

    // Bir ürünü silmek için benzersiz bir yol
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await _deleteProductCommandHandler.Handle(new DeleteProductCommand(id));
        return Ok("Ürün Silindi");
    }

    // Bir ürünü güncellemek için benzersiz bir yol
    [HttpPut]
    public async Task<IActionResult> UpdateProduct(UpdateProductCommand command)
    {
        await _updateProductCommandHandler.Handle(command);
        return Ok("Ürün Güncellendi");
    }
}
