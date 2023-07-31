using eBook.ViewModels.Common;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace eBook.AdminApp.Hubs
{
    public class OrderHub : Hub
    {
        public async Task StatusOrderMessage(ApiResult<string> apiResult)
        {
            await Clients.All.SendAsync("ReceiveMessage", apiResult);
        }
        public async Task CommentMessage(ApiResult<string> apiResult)
        {
            await Clients.All.SendAsync("ReceiveMessage", apiResult);
        }

    }
}