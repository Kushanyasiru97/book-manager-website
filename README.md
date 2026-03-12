# 📚 Book Manager(BookVault)

A full-stack web application for managing a personal book collection. Built with **Angular** for the frontend and **ASP.NET Core Web API** for the backend.

---

## 🖥️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Angular, TypeScript, SCSS         |
| Backend   | ASP.NET Core, C#                  |
| API       | RESTful API                       |
| Storage   | In-memory list                    |
| Fonts     | Google Fonts (Inter, Playfair Display) |
| Icons     | PrimeIcons                        |

---

## ✨ Features

- View all books in a responsive card grid
- Add new books via a side drawer form
- Edit existing book details
- Delete books with a confirmation modal
- Form validation with error messages
- Publication date restricted to past dates only
- Loading skeletons while fetching data
- Empty state when no books exist

---

## 📁 Project Structure

```
book-manager/
├── frontend/                  # Angular app
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── book-list/
│   │   │   │   │   ├── book-list.component.ts
│   │   │   │   │   ├── book-list.component.html
│   │   │   │   │   └── book-list.component.scss
│   │   │   │   └── add-book-form/
│   │   │   │       ├── add-book-form.component.ts
│   │   │   │       ├── add-book-form.component.html
│   │   │   │       └── add-book-form.component.scss
│   │   │   ├── interfaces/
│   │   │   │   └── books.ts
│   │   │   └── services/
│   │   │       └── books.service.ts
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.development.ts
│   │   └── styles.scss
│   └── angular.json
│
└── backend/                   # ASP.NET Core API
    ├── Controllers/
    │   └── BooksController.cs
    ├── Models/
    │   └── Books.cs
    └── Program.cs
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [.NET SDK](https://dotnet.microsoft.com/) (v8 or higher)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-manager.git
cd book-manager
```

---

### 2. Run the Backend

```bash
cd backend
dotnet run
```

The API will start at `https://localhost:7235`

---

### 3. Run the Frontend

```bash
cd frontend
npm install
ng serve
```

The app will be available at `http://localhost:4200`

---

## 🔌 API Endpoints

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | /api/books         | Get all books      |
| GET    | /api/books/{id}    | Get book by ID     |
| POST   | /api/books         | Create a new book  |
| PUT    | /api/books/{id}    | Update a book      |
| DELETE | /api/books/{id}    | Delete a book      |

---
