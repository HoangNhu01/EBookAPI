﻿using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.Sales
{
    public class CheckOutRequest
    {
        public Guid OrderId { get; set; }
        public Guid? UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int PaymentStatus { get; set; }

        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public List<CartItemVm> CartItems { get; set; } = new List<CartItemVm>();
    }
}
