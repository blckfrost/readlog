# Readlog

Simple Node.js + Express + Typescript fullstack project for tracking books,manga and more.

## ✨ Features

- Add new entries (novels, manga, light novels, etc.)
- View list of all your tracked books.
- Edit or update book details
- Delete books from your list
- Mark books as **read** or **unread**
- Toggle read status with ease

## 🛠️ Tech Stack

### 🧩 Frontend

- React + Vite
- Tailwind CSS
- Tanstack Router

### Backend

- Node.js
- Express
- Typescript
- PostgreSQL
- Prisma ORM

### Authentication

- Better-auth

## ⚙️ Local Setup

### 1. Clone the repository.

```bash
git clone https://github.com/blckfrost/readlog.git
cd readlog
npm install
```

### 2. Environment Variables

Create a `.env` file in the root

```env
DATABASE_URL="postgresql://user:password@localhost:5432/readlog_db"
PORT=3000
```

### 3. Setup Database

Run the prisma migration to initialize your database schema

```bash
npx prisma migrate dev --name init
```

### 4. Start the Dev Server

```
npm run dev
```

## 📘 API Endpoints

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | `/api/books`            | Get all books      |
| GET    | `/api/books/:id`        | Get book by ID     |
| POST   | `/api/books`            | Add a new book     |
| PUT    | `/api/books/:id`        | Update a book      |
| PATCH  | `/api/books/:id/status` | Toggle read status |
| DELETE | `/api/books/:id`        | Delete a book      |

## 🤝 Contributing

Contributions and issues are welcome!

1. Fork the repo
2. Create your branch `git checkout -b feature/your-feature`
3. Commit your changes `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request
