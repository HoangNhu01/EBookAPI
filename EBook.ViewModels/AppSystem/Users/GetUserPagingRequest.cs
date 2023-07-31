using eBook.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.AppSystem.Users
{
    public class GetUserPagingRequest : PagedResultBase
    {
        public string Keyword { get; set; }
    }
}