namespace FrogBook
{
    public class FrogData
    {
        public Guid ID { get; set; }
        public DateTime Date { get; set; }

        public int Latitude { get; set; }

        public int Longitude { get; set; }

        public string? Summary { get; set; }

        public string? Status { get; set; }
    }
}