using Microsoft.AspNetCore.Mvc;

namespace FrogBook.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FrogLocationController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Hopping", "Catching flies", "Sunbathing", "Swimming", "Frog misc."
        };

        private readonly ILogger<FrogLocationController> _logger;

        public FrogLocationController(ILogger<FrogLocationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<FrogLocation> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new FrogLocation
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Latitude = Random.Shared.Next(-90, 90),
                Longitude = Random.Shared.Next(-180, 180),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}