using eBook.Data.Entities;
using eBook.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace eBook.ViewModels.Sales
{
    public class OrderVm
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public string ShipName { get; set; }
        public string ShipPhoneNumber { get; set; }
        public string ShipAddress { get; set; }
        public string ShipEmail { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public OrderStatus OrderStatus { get; set; }
        [JsonIgnore]
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
