using book_manager_backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace book_manager_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        // In-memory store books
        private static readonly List<Book> _books = new()
    {
        new Book { Id = 1, Title = "Madol Doova", Author = "Martin Wickramasinghe", Isbn = "978-9558415023", PublicationDate = new DateOnly(1947, 1, 1) },
        new Book { Id = 2, Title = "Amba Yahaluwo", Author = "T. B. Ilangaratne", Isbn = "978-9558415047", PublicationDate = new DateOnly(1957, 1, 1) },
        new Book { Id = 3, Title = "Karumakkarayo", Author = "Gunadasa Amarasekara", Isbn = "978-9558415078", PublicationDate = new DateOnly(1988, 1, 1) },
    };

        private static int _nextId = 4;

        
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll()
        {
            return Ok(_books);
        }

        
        [HttpGet("{id}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book is null) return NotFound(new { message = $"Book with ID {id} not found." });
            return Ok(book);
        }

        
        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
        }

        
        [HttpPut("{id}")]
        public ActionResult<Book> Update(int id, [FromBody] Book updated)
        {
            var existing = _books.FirstOrDefault(b => b.Id == id);
            if (existing is null) return NotFound(new { message = $"Book with ID {id} not found." });

            existing.Title = updated.Title;
            existing.Author = updated.Author;
            existing.Isbn = updated.Isbn;
            existing.PublicationDate = updated.PublicationDate;

            return Ok(existing);
        }

        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book is null) return NotFound(new { message = $"Book with ID {id} not found." });

            _books.Remove(book);
            return NoContent();
        }
    }
}

