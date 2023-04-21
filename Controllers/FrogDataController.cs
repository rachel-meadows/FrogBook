using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Data.SqlTypes;

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
            _logger.LogDebug("Searching for frogs in database (and definitely not just randomly generating them!");
            _logger.LogTrace("Frog {randomId} is currently at latitude {randomLat} and longitude {randomLong}", 
                 Guid.NewGuid(), 
                 Random.Shared.Next(-90, 90), 
                 Random.Shared.Next(-180, 180));
            RandomlyChooseLogEvent(_logger);

            return Enumerable.Range(1, 5).Select(index => new FrogData
            {
                ID = Guid.NewGuid(),
                Date = DateTime.Now.AddDays(index),
                Latitude = Random.Shared.Next(-90, 90),
                Longitude = Random.Shared.Next(-180, 180),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                Status = Status[Random.Shared.Next(Status.Length)]
            })
            .ToArray();
        }

        private static void RandomlyChooseLogEvent(ILogger logger)
        {
            string[] logOptions = new string[] { "information", "warning", "error", "critical" };
            string logOption = logOptions[new Random().Next(logOptions.Length)];

            switch (logOption)
            {
                case "information":
                    logger.LogInformation($"Frog {Guid.NewGuid()} changed activity from hopping to eating flies");
                    break;
                case "warning":
                    logger.LogWarning($"Frog {Guid.NewGuid()} has been inactive for more than 10 seconds");
                    break;
                case "error":
                    logger.LogError(new SqlNullValueException(), "Failed to save changes to database: Activity cannot be null.");
                    break;
                case "critical":
                    logger.LogCritical("Unable to establish a connection to the FrogBook database. Check the connection string and network connectivity immediately!");
                    break;
                default:
                    return;
            }
        }
    }
}