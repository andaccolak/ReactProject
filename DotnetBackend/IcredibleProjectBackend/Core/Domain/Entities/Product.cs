﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string Brand { get; set; }
        public string SalesType { get; set; }
        public int Sales { get; set; }
        public int Quantity { get; set; }
        public double Gram { get; set; }
        public int paketIciAdet { get; set; }
        public int KoliIciAdet { get; set; }
        public double AdetFiyat { get; set; }
        public int BarkodNo { get; set; }





    }
}
