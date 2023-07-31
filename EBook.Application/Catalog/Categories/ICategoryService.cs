using eBook.ViewModels.Catalog.Categories;
using eBook.ViewModels.Catalog.Products;
using eBook.ViewModels.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eBook.Application.Catalog.Categories
{
    public interface ICategoryService
    {
        Task<ApiResult<List<CategoryVm>>> GetAll(string languageId);

        Task<ApiResult<CategoryVm>> GetById(string languageId, int id);

        Task<int> Create(CategoryCreateRequest request);

        Task<int> Update(CategoryUpdateRequest request);

        Task<int> Delete(int categoryId);
    }
}