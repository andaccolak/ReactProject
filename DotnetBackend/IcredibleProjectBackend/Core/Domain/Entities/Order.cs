using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order
    {
        public int OrderID { get; set; }
        public string Date { get; set; }
        public double Balance { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
    }
}
