# Readlog BE

Simple Node.js + Express + Typescript REST API for tracking books,manga and more.

## 🚀 Features

- Add new books (novels, manga, light novels, etc.)
- View all books
- Update book details
- Delete books
- Mark books as read or unread
- Mark books as read or unread

## 🛠️ Tech Stack

- Node.js
- Express
- Typescript
- PostgreSQL
- Prisma

## 📦 Installation

```bash
git clone https://github.com/blckfrost/readlog_be.git
npm install
```

## ⚙️ Setup

1. Create a `.env` file in the root

```env
DATABASE_URL="postgresql://user:password@localhost:5432/readlog_db"
PORT=3000
```

2. Run Prisma migration

```bash
npx prisma migrate dev --name init
```

3. Running the app

```
npm run dev
```

## 📘 API Endpoints

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/books`            | Get all books      |
| GET    | `/books/:id`        | Get book by ID     |
| POST   | `/books`            | Add a new book     |
| PUT    | `/books/:id`        | Update a book      |
| PATCH  | `/books/:id/status` | Toggle read status |
| DELETE | `/books/:id`        | Delete a book      |
