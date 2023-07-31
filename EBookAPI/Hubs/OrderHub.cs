using eBook.ViewModels.Common;
using eBook.ViewModels.Community.Comments;
using eBook.ViewModels.Sales;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace eBook.BackendApi.Hubs
{
    public class OrderHub : Hub
    {
        public async Task OrderCheckOut(CheckOutRequest request)
        {
            await Clients.All.SendAsync("ReceiveMessage", request);
        }
        public async Task CommentMessage(CommetCreateRequest request)
        {
            await Clients.All.SendAsync("ReceiveMessage", request);
        }
    }
}