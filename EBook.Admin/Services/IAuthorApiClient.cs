using eBook.ViewModels.Catalog.Authors;
using eBook.ViewModels.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBook.AdminApp.Services
{
    public interface IAuthorApiClient
    {
        Task<ApiResult<List<AuthorVm>>> GetAll();

        Task<ApiResult<AuthorVm>> GetById(int id);

        Task<ApiResult<bool>> CreateAuthor(AuthorCreateRequest request);

        Task<ApiResult<bool>> UpdateAuthor(AuthorUpdateRequest request);

        Task<ApiResult<bool>> DeleteAuthor(int authorId);
    }
}
