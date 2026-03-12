import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from "./component/book-list/book-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'book-manager-frontend';
}
