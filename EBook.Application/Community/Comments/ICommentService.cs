using eBook.Data.Enums;
using eBook.ViewModels.Common;
using eBook.ViewModels.Community.Comments;
using eBook.ViewModels.Sales;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eBook.Application.Community.Comments
{
    public interface ICommentService
    {
        Task<ApiResult<List<CommentVm>>> GetByAnyId(Guid id, int productId, string languageId);
        Task<ApiResult<Guid>> Create(CommetCreateRequest request);

        Task<ApiResult<int>> Update(CommentUpdateRequest request);

        Task<ApiResult<bool>> Delete(Guid commentId);
    }
}
