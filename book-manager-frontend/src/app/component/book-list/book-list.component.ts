import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/books';
import { BookService } from '../../services/books.service';
import { AddBookFormComponent } from '../add-book-form/add-book-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,                                
  imports: [CommonModule, AddBookFormComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error: string | null = null;


  showForm = false;
  editingBook: Book | null = null;

  
  confirmDeleteId: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = null;
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load books. Please make sure the backend API is running.';
        this.loading = false;
      },
    });
  }

  openAddForm(): void {
    this.editingBook = null;
    this.showForm = true;
  }

  openEditForm(book: Book): void {
    this.editingBook = { ...book };
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.editingBook = null;
    this.loadBooks();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.editingBook = null;
  }

  requestDelete(id: number): void {
    this.confirmDeleteId = id;
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  confirmDelete(): void {
    if (this.confirmDeleteId === null) return;
    this.bookService.delete(this.confirmDeleteId).subscribe({
      next: () => {
        this.confirmDeleteId = null;
        this.loadBooks();
      },
      error: () => {
        this.error = 'Failed to delete book.';
        this.confirmDeleteId = null;
      },
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
