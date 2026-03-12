import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

export type BookPayload = Omit<Book, 'id'>;

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.scss'],
})
export class AddBookFormComponent implements OnInit, OnChanges {
  @Input()  editingBook: Book | null = null;

  /** Emits the saved payload so the parent can add/update its list */
  @Output() saved     = new EventEmitter<BookPayload>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  submitting   = false;
  submitError: string | null = null;

  constructor(private fb: FormBuilder) {}

  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingBook'] && this.form) {
      this.populateForm();
    }
  }

  // ── Helpers ──────────────────────────────────────────────
  get isEdit(): boolean {
    return this.editingBook !== null;
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!c && c.invalid && c.touched;
  }

  // ── Form setup ───────────────────────────────────────────
  buildForm(): void {
    this.form = this.fb.group({
      title:           ['', [Validators.required, Validators.minLength(1)]],
      author:          ['', [Validators.required, Validators.minLength(1)]],
      isbn:            ['', [Validators.required, Validators.pattern(/^(?:\d[- ]?){9}[\dX]$|^(?:\d[- ]?){13}$|^\d{13}$/)]],
      publicationDate: ['', [Validators.required]],
    });
    this.populateForm();
  }

  populateForm(): void {
    if (this.editingBook) {
      this.form.patchValue({
        title:           this.editingBook.title,
        author:          this.editingBook.author,
        isbn:            this.editingBook.isbn,
        publicationDate: this.editingBook.publicationDate?.split('T')[0] ?? '',
      });
    } else {
      this.form.reset();
    }
    this.submitError = null;
  }

  // ── Submit ───────────────────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting  = true;
    this.submitError = null;

    // Simulate a short async save (shows spinner, no real HTTP call)
    setTimeout(() => {
      this.submitting = false;
      this.saved.emit(this.form.value as BookPayload);
    }, 500);
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}