using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PaymentRequestModel
    {
        public decimal Price { get; set; }
        public decimal PaidPrice { get; set; }

        // Alıcı bilgileri
        public BuyerInfoModel BuyerInfo { get; set; }

        // Kargo / Teslimat adresi
        public ShippingAddressModel ShippingAddress { get; set; }

        // Sepet Ürünleri
        public List<BasketItemModel> BasketItems { get; set; }
    }

    public class BuyerInfoModel
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        // IdentityNumber vs. gibi ek alanlar da tutabilirsiniz
    }

    public class ShippingAddressModel
    {
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }

    public class BasketItemModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Category1 { get; set; }
        public string ItemType { get; set; }
        public decimal Price { get; set; }
    }

}
