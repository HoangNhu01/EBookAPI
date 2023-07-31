using Microsoft.AspNetCore.Mvc;
using Microsoft.Exchange.WebServices.Data;
using OpenAI_API;
using OpenAI_API.Completions;
using System.Threading.Tasks;

namespace EBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : Controller
    {
        [HttpPost]
        
        public IActionResult GetResult([FromBody] string prompt)
        {
            //your OpenAI API key
            string apiKey = "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";
            string answer = string.Empty;
            var openai = new OpenAIAPI(apiKey);
            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = prompt;
            completion.Model = OpenAI_API.Models.Model.DavinciText;
            completion.MaxTokens = 1;
            var result = openai.Completions.CreateCompletionAsync(completion);
            if (result.Result != null)
            {
                foreach (var item in result.Result.Completions)
                {
                    answer = item.Text;
                }
                return Ok(answer);
            }
            else
            {
                return BadRequest("Not found");
            }
        }
    }
}
