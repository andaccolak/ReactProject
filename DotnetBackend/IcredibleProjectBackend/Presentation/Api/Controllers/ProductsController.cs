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
    private readonly GetBestSellerProductQueryHandler _getBestSellerProductQueryHandler;
    private readonly GetSimilarProductsQueryHandler _getSimilarProductsQueryHandler;

    public ProductsController(CreateProductCommandHandler createProductCommandHandler, DeleteProductCommandHandler deleteProductCommandHandler, UpdateProductCommandHandler updateProductCommandHandler, GetProductQueryHandler getProductQueryHandler, GetProductByIdQueryHandler getProductByIdQueryHandler, GetBestSellerProductQueryHandler getBestSellerProductQueryHandler, GetSimilarProductsQueryHandler getSimilarProductsQueryHandler)
    {
        _createProductCommandHandler = createProductCommandHandler;
        _deleteProductCommandHandler = deleteProductCommandHandler;
        _updateProductCommandHandler = updateProductCommandHandler;
        _getProductQueryHandler = getProductQueryHandler;
        _getProductByIdQueryHandler = getProductByIdQueryHandler;
        _getBestSellerProductQueryHandler = getBestSellerProductQueryHandler;
        _getSimilarProductsQueryHandler = getSimilarProductsQueryHandler;
    }

    [HttpGet("list")]
    public async Task<IActionResult> ProductList()
    {
        var values = await _getProductQueryHandler.Handle();
        return Ok(values);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var value = await _getProductByIdQueryHandler.Handle(new GetProductByIdQuery(id));
        return Ok(value);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct(CreateProductCommand command)
    {
        await _createProductCommandHandler.Handle(command);
        return Ok("Ürün Eklendi");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await _deleteProductCommandHandler.Handle(new DeleteProductCommand(id));
        return Ok("Ürün Silindi");
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProduct(UpdateProductCommand command)
    {
        await _updateProductCommandHandler.Handle(command);
        return Ok("Ürün Güncellendi");
    }

    [HttpGet("bestseller")]
    public IActionResult GetBestSellerProducts()
    {
        var values = _getBestSellerProductQueryHandler.Handle();
        return Ok(values);
    }
    [HttpGet("GetSimilarProducts/{categoryId}")]
    public  IActionResult GetSimilarProducts(int categoryId)
    {
        var values =  _getSimilarProductsQueryHandler.Handle(categoryId);
        return Ok(values);
    }
}
