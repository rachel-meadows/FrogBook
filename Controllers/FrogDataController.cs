using Microsoft.AspNetCore.Mvc;

namespace FrogBook.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FrogDataController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Hopping", "Catching flies", "Sunbathing", "Swimming", "Frog misc."
        };

        private static readonly string[] Status = new[]
{
            "Safe", "Safe", "Safe", "Escaping"
        };

        private readonly ILogger<FrogDataController> _logger;

        public FrogDataController(ILogger<FrogDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<FrogData> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new FrogData
            {
                Date = DateTime.Now.AddDays(index),
                Latitude = Random.Shared.Next(-90, 90),
                Longitude = Random.Shared.Next(-180, 180),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                Status = Status[Random.Shared.Next(Status.Length)]
            })
            .ToArray();
        }
    }
}