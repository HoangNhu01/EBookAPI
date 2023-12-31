﻿using eBook.Application.Common;
using eBook.Data.EF;
using eBook.Data.Entities;
using eBook.Data.Enums;
using eBook.Utilities.Exceptions;
using eBook.ViewModels.Catalog.ProductImages;
using eBook.ViewModels.Catalog.Products;
using eBook.ViewModels.Common;
using eBook.ViewModels.Statistic;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace eBook.Application.Catalog.Products
{
    public class ProductService : IProductService
    {
        private readonly EShopDbContext _context;
        private readonly IStorageService _storageService;

        public ProductService(EShopDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<int> AddImage(int productId, ProductImageCreateRequest request)
        {
            var productImage = new ProductImage()
            {
                Caption = request.Caption,
                DateCreated = DateTime.Now,
                IsDefault = request.IsDefault,
                ProductId = productId,
                SortOrder = request.SortOrder
            };

            if (request.ImageFile != null)
            {
                productImage.ImagePath = this.SaveFile(request.ImageFile).Result.FileName;
                productImage.Data = this.SaveFile(request.ImageFile).Result.Data;
                productImage.FileSize = request.ImageFile.Length;
            }
            _context.ProductImages.Add(productImage);
            await _context.SaveChangesAsync();
            return productImage.Id;
        }

        public async Task AddViewcount(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            product.ViewCount += 1;
            await _context.SaveChangesAsync();
        }

        public async Task<int> Create(ProductCreateRequest request)
        {
            var product = new Product()
            {
                Price = request.Price,
                OriginalPrice = request.OriginalPrice,
                Stock = request.Stock,
                ViewCount = 0,
                DateCreated = DateTime.Now,
                AuthorId = request.AuthorId,
                ProductTranslations = new List<ProductTranslation>()
                {
                    new ProductTranslation()
                    {
                        Name =  request.Name,
                        Description = request.Description,
                        Details = request.Details,
                        SeoDescription = request.SeoDescription,
                        SeoAlias = request.SeoAlias,
                        SeoTitle = request.SeoTitle,
                        LanguageId = request.LanguageId
                    }
                }
            };
            
            if (request.ThumbnailImage != null)
            {
                product.ProductImages = new List<ProductImage>()
                {
                    new ProductImage()
                    {
                        Caption = "Thumbnail image",
                        DateCreated = DateTime.Now,
                        FileSize = request.ThumbnailImage.Length,
                        ImagePath = this.SaveFile(request.ThumbnailImage).Result.FileName,
                        Data = this.SaveFile(request.ThumbnailImage).Result.Data,
                        IsDefault = true,
                        SortOrder = 1
                    }
                };
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<int> Delete(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) throw new EShopException($"Cannot find a product: {productId}");

            var images = _context.ProductImages.Where(i => i.ProductId == productId);
            foreach (var image in images)
            {
                await _storageService.DeleteFileAsync(image.ImagePath);
            }

            _context.Products.Remove(product);

            return await _context.SaveChangesAsync();
        }
        public async Task<int> DeleteImage(int imageId)
        {
            var productImage = await _context.ProductImages.FindAsync(imageId);
            if (productImage == null) throw new EShopException($"Cannot find a image: {imageId}");  
            
            await _storageService.DeleteFileAsync(productImage.ImagePath);


            _context.ProductImages.Remove(productImage);

            return await _context.SaveChangesAsync();
        }
        //<img src="data:image/jpeg;base64,{resultObj.items.listImg[1]}" alt="File Image" />

        public async Task<ApiResult<PagedResult<ProductVm>>> GetAllPaging(GetManageProductPagingRequest request)
        {
           

            var query = _context.ProductTranslations.Include(x => x.Product).ThenInclude(p => p.ProductInCategories)
                                                                            .ThenInclude(pc => pc.Category)
                                                    .Include(x => x.Product).ThenInclude(p => p.ProductImages)
                                                    .Include(x => x.Product).ThenInclude(i => i.Author)
                                                                            
                                                    .Include(x => x.Product).ThenInclude(x => x.ProductImages)
                                                    .Where(x => x.Name.Contains(request.Keyword ?? "")
                                                                    && x.LanguageId == request.LanguageId);


            if (request.CategoryIds?.Count() > 0)
            {
                query = query.Where(x => x.Product.ProductInCategories
                                        .Where(c => request.CategoryIds
                                        .Contains(c.CategoryId)).Count() > 0);
            }

            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new ProductVm()
                {
                    Id = x.Product.Id,
                    Name = x.Name,
                    DateCreated = x.Product.DateCreated,
                    Description = x.Description,
                    Details = x.Details,
                    LanguageId = x.LanguageId,
                    OriginalPrice = x.Product.OriginalPrice,
                    Price = x.Product.Price,
                    SeoAlias = x.SeoAlias,
                    SeoDescription = x.SeoDescription,
                    SeoTitle = x.SeoTitle,
                    Stock = x.Product.Stock,
                    ViewCount = x.Product.ViewCount,
                    ProductInCategories = x.Product.ProductInCategories,
                    Author = x.Product.Author,
                    IsFeature = x.Product.IsFeatured,
                    ThumbnailImage =x.Product.ProductImages.FirstOrDefault(x => x.Data != null && x.IsDefault).Data
                                                                     
                }).ToListAsync();

            //4. Select and projection
            var pagedResult = new ApiSuccessResult<PagedResult<ProductVm>>()
            {
                ResultObj = new PagedResult<ProductVm>
                {
                    TotalRecords = totalRow,
                    PageSize = request.PageSize,
                    PageIndex = request.PageIndex,
                    Items = data
                }
            };
            return pagedResult;
        }

        public async Task<ApiResult<ProductVm>> GetById(int productId, string languageId)
        {
            var productTranslation = await _context.ProductTranslations.Include(x => x.Product)
                                                                       .ThenInclude(x => x.ProductInCategories)
                                                                       .ThenInclude(x => x.Category)
                                                                       .ThenInclude(x => x.CategoryTranslations)
                                                                       .Include(x => x.Product)
                                                                    
                                                                       .ThenInclude(x => x.Author)
                                                                       .Include(x => x.Product).ThenInclude(x=>x.ProductImages)
                                                                       .FirstOrDefaultAsync(x => x.ProductId == productId
                                                                                            && x.LanguageId == languageId);

            var productViewModel = new ProductVm()
            {
                Id = productTranslation.Product.Id,
                DateCreated = productTranslation.Product.DateCreated,
                Description = productTranslation != null ? productTranslation.Description : null,
                LanguageId = productTranslation.LanguageId,
                Details = productTranslation != null ? productTranslation.Details : null,
                Name = productTranslation != null ? productTranslation.Name : null,
                OriginalPrice = productTranslation.Product.OriginalPrice,
                Price = productTranslation.Product.Price,
                SeoAlias = productTranslation != null ? productTranslation.SeoAlias : null,
                SeoDescription = productTranslation != null ? productTranslation.SeoDescription : null,
                SeoTitle = productTranslation != null ? productTranslation.SeoTitle : null,
                Stock = productTranslation.Product.Stock,
                ViewCount = productTranslation.Product.ViewCount,
                ProductInCategories = productTranslation.Product.ProductInCategories,
                Categories = string.Join(",", productTranslation.Product.ProductInCategories.Select(x => x.Category.CategoryTranslations.First().Name) ),
                Author = productTranslation.Product.Author,
                ProductImages = productTranslation.Product.ProductImages,
                ThumbnailImage = productTranslation.Product.ProductImages.FirstOrDefault(x => x.Data != null && x.IsDefault).Data,
                ListImg = productTranslation.Product.ProductImages.Where(x => x.Data != null)
                                                                     .Select(x => x.Data)
                                                                     .ToList()
        };
            return new ApiSuccessResult<ProductVm>(productViewModel);
        }

        public async Task<ProductImageVm> GetImageById(int imageId)
        {
            var image = await _context.ProductImages.FindAsync(imageId);
            if (image == null)
                throw new EShopException($"Cannot find an image with id {imageId}");

            var viewModel = new ProductImageVm()
            {
                Caption = image.Caption,
                DateCreated = image.DateCreated,
                FileSize = image.FileSize,
                Id = image.Id,
                ImagePath = image.ImagePath,
                IsDefault = image.IsDefault,
                ProductId = image.ProductId,
                SortOrder = image.SortOrder,
                Data = image.Data,
            };
            return viewModel;
        }

        public async Task<List<ProductImageVm>> GetListImages(int productId)
        {
            return await _context.ProductImages.Where(x => x.ProductId == productId)
                .Select(i => new ProductImageVm()
                {
                    Caption = i.Caption,
                    DateCreated = i.DateCreated,
                    FileSize = i.FileSize,
                    Id = i.Id,
                    ImagePath = i.ImagePath,
                    IsDefault = i.IsDefault,
                    ProductId = i.ProductId,
                    SortOrder = i.SortOrder,
                    Data = i.Data
                }).ToListAsync();
        }

       

        public async Task<int> Update(ProductUpdateRequest request)
        {
            var productTranslations = await _context.ProductTranslations.Include(x => x.Product).FirstOrDefaultAsync(x => x.ProductId == request.Id
            && x.LanguageId == request.LanguageId);

            if (productTranslations == null) throw new EShopException($"Cannot find a product with id: {request.Id}");

            productTranslations.Name = request.Name;
            productTranslations.SeoAlias = request.SeoAlias;
            productTranslations.SeoDescription = request.SeoDescription;
            productTranslations.SeoTitle = request.SeoTitle;
            productTranslations.Description = request.Description;
            productTranslations.Details = request.Details;
            productTranslations.Product.Price = request.Price;
            productTranslations.Product.Stock = request.Stock;
            productTranslations.Product.OriginalPrice = request.OPrice;

            //Save image
            if (request.ThumbnailImage != null)
            {
                var thumbnailImage = await _context.ProductImages.FirstOrDefaultAsync(i => i.IsDefault == true && i.ProductId == request.Id);
                if (thumbnailImage != null)
                {
                    thumbnailImage.FileSize = request.ThumbnailImage.Length;
                    thumbnailImage.ImagePath =  this.SaveFile(request.ThumbnailImage).Result.FileName;
                    thumbnailImage.Data = this.SaveFile(request.ThumbnailImage).Result.Data;
                    _context.ProductImages.Update(thumbnailImage);
                }
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateImage(int imageId, ProductImageUpdateRequest request)
        {
            var productImage = await _context.ProductImages.FindAsync(imageId);
            if (productImage == null)
                throw new EShopException($"Cannot find an image with id {imageId}");

            if (request.ImageFile != null)
            {
                productImage.ImagePath = this.SaveFile(request.ImageFile).Result.FileName;
                productImage.FileSize = request.ImageFile.Length;
            }
            _context.ProductImages.Update(productImage);
            return await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdatePrice(int productId, decimal newPrice)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) throw new EShopException($"Cannot find a product with id: {productId}");
            product.Price = newPrice;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateStock(int productId, int addedQuantity)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) throw new EShopException($"Cannot find a product with id: {productId}");
            product.Stock += addedQuantity;
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<ImageFileSave> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            byte[] content;

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                content = memoryStream.ToArray();
            }
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return new ImageFileSave{ FileName = fileName, Data = content };
        }

        public async Task<ApiResult<bool>> CategoryAssign(int id, CategoryAssignRequest request)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return new ApiErrorResult<bool>($"Sản phẩm với id {id} không tồn tại");
            }
            foreach (var category in request.Categories)
            {
                var productInCategory = await _context.ProductInCategories
                    .FirstOrDefaultAsync(x => x.CategoryId == int.Parse(category.Id)
                    && x.ProductId == id);
                if (productInCategory != null && category.Selected == false)
                {
                    _context.ProductInCategories.Remove(productInCategory);
                }
                else if (productInCategory == null && category.Selected)
                {
                    await _context.ProductInCategories.AddAsync(new ProductInCategory()
                    {
                        CategoryId = int.Parse(category.Id),
                        ProductId = id
                    });
                }
            }
            await _context.SaveChangesAsync();
            return new ApiSuccessResult<bool>();
        }

        public async Task<bool> UpdateFeature(int productId, bool isFeature)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) throw new EShopException($"Cannot find a product with id: {productId}");
            product.IsFeatured = isFeature;
            await _context.SaveChangesAsync();
            return true;
        }
    }

   
}