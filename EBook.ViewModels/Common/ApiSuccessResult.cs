﻿using eBook.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace eBook.ViewModels.Common
{
    public class ApiSuccessResult<T> : ApiResult<T>
    {
        public ApiSuccessResult(T resultObj)
        {
            IsSuccessed = true;
            ResultObj = resultObj;
        }
        public ApiSuccessResult(T resultObj, string message)
        {
            IsSuccessed = true;
            ResultObj = resultObj;
            Message = message;
        }
        public ApiSuccessResult()
        {
            IsSuccessed = true;
        }
    }
}