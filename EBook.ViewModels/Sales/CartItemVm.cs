﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eBook.ViewModels.Sales
{
    public class CartItemVm
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }

        public byte[]? Image { get; set; }

        public decimal Price { get; set; }
    }
}