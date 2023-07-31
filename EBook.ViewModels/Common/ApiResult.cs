using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.Common
{
    public class ApiResult<T>
    {
        public bool IsSuccessed { get; set; }

        public string Message { get; set; }

        public virtual T ResultObj { get; set; }
    }
}