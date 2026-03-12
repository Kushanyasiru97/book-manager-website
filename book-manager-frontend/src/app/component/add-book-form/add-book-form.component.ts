import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Book } from '../../interfaces/books';
import { BookService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.scss'],
})
export class AddBookFormComponent implements OnInit, OnChanges {
  @Input() editingBook: Book | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  submitting = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingBook'] && this.form) {
      this.populateForm();
    }
  }

  get isEdit(): boolean {
    return this.editingBook !== null;
  }

  buildForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      author: ['', [Validators.required, Validators.minLength(1)]],
      isbn: ['', [Validators.required]],
      publicationDate: ['', [Validators.required]],
    });
    this.populateForm();
  }

  populateForm(): void {
    if (this.editingBook) {
      this.form.patchValue({
        title: this.editingBook.title,
        author: this.editingBook.author,
        isbn: this.editingBook.isbn,
        publicationDate: this.editingBook.publicationDate?.split('T')[0] ?? '',
      });
    } else {
      this.form.reset();
    }
    this.submitError = null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitError = null;
    const payload = this.form.value;

    const request$ = this.isEdit
      ? this.bookService.update(this.editingBook!.id, payload)
      : this.bookService.create(payload);

    request$.subscribe({
      next: () => {
        this.submitting = false;
        this.form.reset(); // ✅ මේක add කරන්න — form clear වෙනවා
        this.saved.emit();
      },
      error: () => {
        this.submitting = false;
        this.submitError = 'Could not save the book. Please try again.';
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!c && c.invalid && c.touched;
  }
}
