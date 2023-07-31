using eBook.Application.Catalog.Categories;
using eBook.Application.Community.Comments;
using eBook.BackendApi.Hubs;
using eBook.ViewModels.Catalog.Categories;
using eBook.ViewModels.Community.Comments;
using eBook.ViewModels.Sales;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Exchange.WebServices.Data;
using System;
using System.Threading.Tasks;

namespace eBook.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : Controller
    {
        private readonly ICommentService _commentService;
        private IHubContext<OrderHub> _hubContext;

        public CommentsController(
            ICommentService commentService, IHubContext<OrderHub> hubContext)
        {
            _commentService = commentService;
            _hubContext = hubContext;
        }
        [HttpGet]
        public async Task<IActionResult> Index(Guid userId, int productId, string languageId)
        {
            var comments = await _commentService.GetByAnyId(userId, productId, languageId);
            return Ok(comments);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommetCreateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var apiResult = await _commentService.Create(request);
            if (apiResult.ResultObj == Guid.Empty)
                return BadRequest();
            await _hubContext.Clients.All.SendAsync("CommentMessage", request);
            return Ok(apiResult);
        }
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] CommentUpdateRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var affectedResult = await _commentService.Update(request);
            if (affectedResult.ResultObj == 0)
                return BadRequest();
            return Ok(affectedResult);
        }
    }
}
