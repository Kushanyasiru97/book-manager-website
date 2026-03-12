import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookFormComponent, Book, BookPayload } from '../add-book-form/add-book-form.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, AddBookFormComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  loading = false;
  error: string | null = null;

  showForm        = false;
  editingBook: Book | null = null; 
  confirmDeleteId: number | null = null;

  private nextId = 6;

  /** Mock Data */
  private readonly mockBooks: Book[] = [
    { id: 1, title: 'The Great Gatsby',        author: 'F. Scott Fitzgerald', isbn: '978-0743273565', publicationDate: '1925-04-10' },
    { id: 2, title: 'To Kill a Mockingbird',   author: 'Harper Lee',          isbn: '978-0061935466', publicationDate: '1960-07-11' },
    { id: 3, title: '1984',                    author: 'George Orwell',       isbn: '978-0451524935', publicationDate: '1949-06-08' },
    { id: 4, title: 'Pride and Prejudice',     author: 'Jane Austen',         isbn: '978-0141439518', publicationDate: '1813-01-28' },
    { id: 5, title: 'The Catcher in the Rye',  author: 'J.D. Salinger',       isbn: '978-0316769174', publicationDate: '1951-07-16' },
  ];

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error   = null;
    setTimeout(() => {
      this.books   = this.mockBooks.map(b => ({ ...b }));
      this.loading = false;
    }, 800);
  }

  openAddForm(): void {
    this.editingBook = null;
    this.showForm    = true;
  }

  openEditForm(book: Book): void {
    this.editingBook = { ...book };
    this.showForm    = true;
  }

  cancelForm(): void {
    this.showForm    = false;
    this.editingBook = null;
  }

  
  onFormSaved(payload: BookPayload): void {
    if (this.editingBook) {
      // Update existing book
      const idx = this.books.findIndex(b => b.id === this.editingBook!.id);
      if (idx !== -1) {
        this.books[idx] = { id: this.editingBook.id, ...payload };
        const mIdx = this.mockBooks.findIndex(b => b.id === this.editingBook!.id);
        if (mIdx !== -1) this.mockBooks[mIdx] = { ...this.books[idx] };
      }
    } else {
      // Add new book
      const newBook: Book = { id: this.nextId++, ...payload };
      this.books = [newBook, ...this.books];
      this.mockBooks.unshift({ ...newBook });
    }

    this.showForm    = false;
    this.editingBook = null;
  }

  /*DELETE*/
  requestDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId === null) return;
    this.books = this.books.filter(b => b.id !== this.confirmDeleteId);
    const mIdx = this.mockBooks.findIndex(b => b.id === this.confirmDeleteId);
    if (mIdx !== -1) this.mockBooks.splice(mIdx, 1);
    this.confirmDeleteId = null;
  }

  
  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}