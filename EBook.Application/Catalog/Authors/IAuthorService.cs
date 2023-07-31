
using eBook.ViewModels.Catalog.Authors;
using eBook.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eBook.Application.Catalog.Authors
{
    public interface IAuthorService
    {
        Task<ApiResult<List<AuthorVm>>> GetAll();

        Task<ApiResult<AuthorVm>> GetById(int id);

        Task<int> DeleteAuthor(int authorId);

        Task<ApiResult<bool>> UpdateAuthor(AuthorUpdateRequest request);

        Task<ApiResult<int>> CreateAuthor(AuthorCreateRequest request);
    }
}