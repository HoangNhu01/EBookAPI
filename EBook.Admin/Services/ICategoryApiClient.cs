using eBook.ViewModels.Catalog.Categories;
using eBook.ViewModels.Catalog.Products;
using eBook.ViewModels.Common;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eBook.AdminApp.Services
{
    public interface ICategoryApiClient
    {
        Task<ApiResult<List<CategoryVm>>> GetAll(string languageId);

        Task<ApiResult<CategoryVm>> GetById(string languageId, int id);

        Task<ApiResult<CategoryVm>> CreateCategory(CategoryCreateRequest request);

        Task<int> UpdateCategory(CategoryUpdateRequest request);

        Task<int> DeleteCategory(int id);
        
    }
}
