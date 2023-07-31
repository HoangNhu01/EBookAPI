using eBook.AdminApp.Services;
using eBook.Data.Enums;
using eBook.Utilities.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System;
using eBook.ViewModels.Catalog.Authors;

namespace eBook.AdminApp.Controllers
{
    public class AuthorController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthorApiClient _authorApiClient;

        public AuthorController(
            IConfiguration configuration,
            IAuthorApiClient authorApiClient)
        {
            _configuration = configuration;
            _authorApiClient = authorApiClient;

        }
        // GET: CategoryController
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var data = await _authorApiClient.GetAll();
            if (TempData["result"] != null)
            {
                ViewBag.SuccessMsg = TempData["result"];
            }
            return View(data.ResultObj);
        }

        // GET: CategoryController/Details/5
        public async Task<IActionResult> Detail(int id)
        {
            var data = await _authorApiClient.GetById(id);
            return View(data.ResultObj);
        }

        // GET: CategoryController/Create
        [HttpGet]
        public async Task<ActionResult> Create()
        {
            return View(new AuthorCreateRequest());
        }

        // POST: CategoryController/Create
        [HttpPost]
        public async Task<IActionResult> Create(AuthorCreateRequest request)
        {
            if (!ModelState.IsValid)
                return View(request);

            var result = await _authorApiClient.CreateAuthor(request);
            if (result.ResultObj)
            {
                TempData["result"] = "Thêm mới tác giả thành công";
                return RedirectToAction("Index");
            }
            ModelState.AddModelError("", "Thêm nguyên thất bại");
            return View(request);
        }

        // GET: CategoryController/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            var author = _authorApiClient.GetById(id).Result.ResultObj;
            var editVm = new AuthorUpdateRequest()
            {
                Id = id,
                Name = author.Name,
                Description = author.Description,
            };
            return View(editVm);
        }

        // POST: CategoryController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(AuthorUpdateRequest request)
        {
            if (!ModelState.IsValid)
                return View(request);

            var result = await _authorApiClient.UpdateAuthor(request);
            if (result.IsSuccessed)
            {
                TempData["result"] = "Cập nhật tác giả thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Cập nhật tác giả thất bại");
            return View(request);
        }

        // GET: CategoryController/Delete/5
        public ActionResult Delete(int id)
        {
            return View(new AuthorVm()
            {
                Id = id
            });
        }

        // POST: CategoryController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(AuthorVm request)
        {
            if (!ModelState.IsValid)
                return View();

            var result = await _authorApiClient.DeleteAuthor(request.Id);
            if (result.ResultObj)
            {
                TempData["result"] = "Xóa tác giả thành công";
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "Xóa không thành công");
            return View(request);
        }
    }
}
