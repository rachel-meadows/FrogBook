namespace FrogBook
{
    public class FrogLocation
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public int Latitude { get; set; }

        public int Longitude { get; set; }

        public string? Summary { get; set; }
    }
}