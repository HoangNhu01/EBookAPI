using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eBook.Application.Catalog.Authors;
using eBook.Data.Entities;
using eBook.ViewModels.Catalog.Authors;
using eBook.ViewModels.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eBook.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorsController(
            IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _authorService.GetAll();
            if (data.IsSuccessed)
            {
                return Ok(data);

            }
            else { return BadRequest(); }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _authorService.GetById( id);
            if (data.IsSuccessed)
            {
                return Ok(data);

            }
            else { return BadRequest(); }
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AuthorCreateRequest request)
        {
            var data = await _authorService.CreateAuthor(request);
            var authorId = data.ResultObj;
            if (authorId == 0)
                return BadRequest();

            var author = await _authorService.GetById(authorId);

            return CreatedAtAction(nameof(GetById), new { id = authorId }, author);
        }
        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] AuthorUpdateRequest request)
        {
            var data = await _authorService.UpdateAuthor(request);
            if(data.IsSuccessed)
            {
                return Ok(data);

            }
            else { return BadRequest(data.Message   ); }

        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int authorId)
        {
            var data = await _authorService.DeleteAuthor(authorId);
            if (data > 0)
            {
                return Ok(data);

            }
            else { return BadRequest();}
        }
    }
}