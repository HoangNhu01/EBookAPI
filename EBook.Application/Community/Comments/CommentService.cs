﻿using eBook.Data.EF;
using eBook.Data.Entities;
using eBook.Data.Enums;
using eBook.Utilities.Exceptions;
using eBook.ViewModels.Common;
using eBook.ViewModels.Community.Comments;
using eBook.ViewModels.Sales;
using Microsoft.EntityFrameworkCore;
using Microsoft.Exchange.WebServices.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Threading.Tasks;

namespace eBook.Application.Community.Comments
{
    public class CommentService : ICommentService
    {
        private readonly EShopDbContext _context;

        public CommentService(EShopDbContext context)
        {
            _context = context;
        }
        public async Task<ApiResult<Guid>> Create(CommetCreateRequest request)
        {
            var newComment = new Comment()
            {
                Id = request.Id ?? Guid.NewGuid(),
                UserId = request.UserId,
                ParentId = request.ParentId,
                ProductId = request.ProductId,
                CommentText = request.CommentText,
                CreatedDate = request.CreatedDate,

            };
          
            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();
            return new ApiSuccessResult<Guid>()
            {
                ResultObj = newComment.Id
            };
        }

        public async Task<ApiResult<bool>> Delete(Guid commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
                throw new EShopException($"Can not find order by {commentId}");
            var res = _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            if (res != null)
            {
                return new ApiSuccessResult<bool>(true, "Xóa đánh giá thành công");
            }
            else
            {
                return new ApiErrorResult<bool>("Xóa đánh giá thất bại");
            }
        }

        public async Task<ApiResult<List<CommentVm>>> GetByAnyId(Guid userId, int productId, string languageId)
        {
            var comments = _context.Comments.Where(x => x.UserId.ToString()
                                            .Contains(userId == Guid.Empty ? "" : userId.ToString())
                                            && x.ProductId.ToString()
                                            .Contains(productId ==0 ? "" : productId.ToString()))
                                            .Include(x => x.Product)
                                            .ThenInclude(x =>x.ProductTranslations)
                                            .Include(x => x.User);

            var commentVM = await comments.Select(x => new CommentVm()
            {
                UserId = userId,
                ProductId = productId,
                CreatedDate = x.CreatedDate,
                CommentText = x.CommentText,
                UserName = x.User.UserName,
                ParentId = x.ParentId,
                Id = x.Id,
                ProductName = x.Product.ProductTranslations
                                       .FirstOrDefault(x => x.LanguageId == languageId).Name,
            }).ToListAsync();
            return new ApiSuccessResult<List<CommentVm>>()
            {
                ResultObj = commentVM
            };
        }

        public async Task<ApiResult<int>> Update(CommentUpdateRequest request)
        {
            var comment = await _context.Comments.FindAsync(request.Id);

            comment.CommentText = request.CommentText;
            comment.ParentId = request.ParentId;
            var result = await _context.SaveChangesAsync();
            return new ApiSuccessResult<int>(result, "Chỉnh sửa đánh giá thàng công");
        }
    }
}
