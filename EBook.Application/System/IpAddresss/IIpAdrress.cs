using eBook.ViewModels.Common;

namespace eBook.AdminApp.IpAddresss
{
    public interface IIpAdrress
    {
        ApiResult<string> GetLocalIPAddress();
    }
}
