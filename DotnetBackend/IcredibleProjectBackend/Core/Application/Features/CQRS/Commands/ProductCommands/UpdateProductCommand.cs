using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Commands.ProductCommands
{
    public class UpdateProductCommand
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string Brand { get; set; }
        public string SalesType { get; set; }
        public int Sales { get; set; }
        public int Quantity { get; set; }
    }
}
