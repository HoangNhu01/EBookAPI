using eBook.Data.Enums;
using eBook.ViewModels.Common;
using eBook.ViewModels.Sales;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBook.AdminApp.Services
{
    public interface IOrderApiClient
    {
        Task<ApiResult<List<OrderVm>>> GetAll(Guid uId);

        Task<ApiResult<OrderVm>> GetById(Guid id);

        Task<ApiResult<bool>> UpdateOrderStatus(Guid id, OrderStatus orderStatus);

        Task<ApiResult<bool>> DeleteOrder(Guid id);
    }
}
