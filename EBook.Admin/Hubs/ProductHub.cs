using eBook.ViewModels.Catalog.Products;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace eBook.AdminApp.Hubs
{
    public class ProductHub : Hub
    {
        public async Task SendMessage(ProductVm productVm)
        {
            await Clients.All.SendAsync("ReceiveMessage", productVm);
        }
    }
}
