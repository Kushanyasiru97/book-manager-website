using System.ComponentModel.DataAnnotations;

namespace book_manager_backend.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Author { get; set; } = string.Empty;
        [Required]
        public string Isbn { get; set; } = string.Empty;
        [Required]
        public DateOnly PublicationDate { get; set; }
    }
}
