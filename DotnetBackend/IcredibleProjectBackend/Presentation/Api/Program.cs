using Application.Features.CQRS.Handlers.CategoryHandlers;
using Application.Features.CQRS.Handlers.ProductHandlers;
using Application.Interfaces;
using Persistence.Context;
using Persistence.Repositories;
using Persistence.Repositories.ProductRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<DatabaseContext>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(IProductRepository), typeof(ProductRepository));
builder.Services.AddScoped<GetProductByIdQueryHandler>();
builder.Services.AddScoped<GetProductQueryHandler>();
builder.Services.AddScoped<CreateProductCommandHandler>();
builder.Services.AddScoped<DeleteProductCommandHandler>();
builder.Services.AddScoped<UpdateProductCommandHandler>();
builder.Services.AddScoped<GetBestSellerProductQueryHandler>();
builder.Services.AddScoped<GetSimilarProductsQueryHandler>();


builder.Services.AddScoped<GetCategoryByIdQueryHandler>();
builder.Services.AddScoped<GetCategoryQueryHandler>();
builder.Services.AddScoped<CreateCategoryCommandHandler>();
builder.Services.AddScoped<DeleteCategoryCommandHandler>();
builder.Services.AddScoped<UpdateCategoryCommandHandler>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll"); // Apply the CORS policy

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
