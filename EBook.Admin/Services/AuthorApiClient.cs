using eBook.ViewModels.Catalog.Categories;
using eBook.ViewModels.Catalog.Authors;
using eBook.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace eBook.AdminApp.Services
{
    public class AuthorApiClient : BaseApiClient, IAuthorApiClient
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthorApiClient(IHttpClientFactory httpClientFactory,
                   IHttpContextAccessor httpContextAccessor,
                    IConfiguration configuration)
            : base(httpClientFactory, httpContextAccessor, configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ApiResult<bool>> CreateAuthor(AuthorCreateRequest request)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration["BaseAddress"]);
            var response = await client.PostAsync("/api/authors", httpContent);
            if (response.IsSuccessStatusCode)
            {
                return new ApiSuccessResult<bool>(response.IsSuccessStatusCode);
            }

            return new ApiErrorResult<bool>();
        }

        public async Task<ApiResult<bool>> DeleteAuthor(int authorId)
        {
            var sessions = _httpContextAccessor.HttpContext.Session.GetString("Token");
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration["BaseAddress"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", sessions);
            var response = await client.DeleteAsync($"/api/authors?authorId={authorId}");
            var body = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                return new ApiSuccessResult<bool>(response.IsSuccessStatusCode);
            }

            return new ApiErrorResult<bool>();
        }

        public async Task<ApiResult<List<AuthorVm>>> GetAll()
        {
            return await GetAsync<ApiResult<List<AuthorVm>>>("/api/authors");
        }

        public async Task<ApiResult<AuthorVm>> GetById(int id)
        {
            return await GetAsync<ApiResult<AuthorVm>>($"/api/authors/{id}");
        }

        public async Task<ApiResult<bool>> UpdateAuthor(AuthorUpdateRequest request)
        {
            var json = JsonConvert.SerializeObject(request);
            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration["BaseAddress"]);
            var response = await client.PutAsync("/api/authors", httpContent);
            if (response.IsSuccessStatusCode)
            {
                return new ApiSuccessResult<bool>(response.IsSuccessStatusCode);
            }

            return new ApiErrorResult<bool>();
        }
    }
}