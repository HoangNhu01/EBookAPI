using eBook.Data.Enums;
using eBook.ViewModels.Catalog.Categories;
using eBook.ViewModels.Common;
using eBook.ViewModels.Sales;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eBook.Application.Sales.Orders
{
    public interface IOrderService
    {
        Task<ApiResult<List<OrderVm>>> GetByUserId(Guid userId);

        Task<ApiResult<OrderVm>> GetById(Guid orderId);

        Task<ApiResult<Guid>> Create(CheckOutRequest request);

        Task<ApiResult<int>> UpdateStatus(Guid orderId, OrderStatus orderStatus);

        Task<ApiResult<bool>> Delete(Guid orderId);


    }
}
