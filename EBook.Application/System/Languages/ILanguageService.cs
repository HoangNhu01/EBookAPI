using eBook.ViewModels.Common;
using eBook.ViewModels.AppSystem.Languages;
using eBook.ViewModels.AppSystem.Users;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eBook.Application.AppSystem.Languages
{
    public interface ILanguageService
    {
        Task<ApiResult<List<LanguageVm>>> GetAll();
    }
}