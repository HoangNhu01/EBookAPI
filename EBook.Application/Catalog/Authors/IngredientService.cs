using eBook.Data.EF;
using eBook.ViewModels.Catalog.Authors;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using eBook.ViewModels.Common;
using eBook.Data.Entities;
using eBook.Utilities.Exceptions;
namespace eBook.Application.Catalog.Authors
{
    public class AuthorService : IAuthorService
    {
        private readonly EShopDbContext _context;

        public AuthorService(EShopDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResult<List<AuthorVm>>> GetAll()
        {
            var query = _context.Authors.Include(x => x.Products);
           
            return new ApiSuccessResult<List<AuthorVm>>()
            {
                ResultObj = await query.Select(x => new AuthorVm()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                }).ToListAsync()
            };
        }
        

        public async Task<ApiResult<AuthorVm>> GetById(int id)
        {
            var query = await _context.Authors.Include(x => x.Products)
                                            .FirstOrDefaultAsync(x => x.Id == id);

            return new ApiSuccessResult<AuthorVm>()
            {
                ResultObj = new AuthorVm()
                {
                    Id = query.Id,
                    Name = query.Name,
                    Description = query.Description,
                   
                }
            };
        }

        public async Task<ApiResult<int>> CreateAuthor(AuthorCreateRequest request)
        {
            var author = new Author()
            {
                Name = request.Name,            
                Description = request.Description,                             
            };
            
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
            return new ApiSuccessResult<int>(author.Id);
        }
        public async Task<ApiResult<bool>> UpdateAuthor(AuthorUpdateRequest request)
        {
            var author = await _context.Authors.FindAsync(request.Id);
            if (author == null)
                throw new EShopException("Không tìm thấy tác giả");
            author.Description = request.Description;
            author.Name = request.Name;
           
            await _context.SaveChangesAsync();
            return new ApiSuccessResult<bool>(true,"Cập nhật thành công");
        }
        public async Task<int> DeleteAuthor(int authorId)
        {
            var author = await _context.Authors.FindAsync(authorId);
            if (author == null) throw new EShopException($"Không tìm thấy tác giả: {authorId}");
            _context.Authors.Remove(author);
            return await _context.SaveChangesAsync();
        }

    }
}