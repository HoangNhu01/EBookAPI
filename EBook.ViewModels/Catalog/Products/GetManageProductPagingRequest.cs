using eBook.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.Catalog.Products
{
    public class GetManageProductPagingRequest : PagedResultBase
    {
        public string Keyword { get; set; }

        public List<int> CategoryIds { get; set; }
        public string LanguageId  { get; set; }
    }
}
