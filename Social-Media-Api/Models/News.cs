namespace Social_Media_API.Models
{
    public class News
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
        public string Email { get; set; }

        public int IsActive { get; set; }
        public int CreatedOn { get; internal set; }
    }
}
