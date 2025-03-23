
import { BookType } from '@/components/BookCard';

// Initial book data
const initialBooks: BookType[] = [
  {
    id: 1,
    title: "The Memory of Forgotten Things",
    author: "Kat Zhang",
    price: 499,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "Fiction"
  },
  {
    id: 2,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 599,
    coverImage: "https://images.unsplash.com/photo-1603162617003-63eb2fe17ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    category: "Thriller"
  },
  {
    id: 3,
    title: "Educated",
    author: "Tara Westover",
    price: 750,
    coverImage: "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "Memoir"
  },
  {
    id: 4,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 650,
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80",
    category: "Historical Fiction"
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    category: "Self-Help"
  },
  {
    id: 6,
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    price: 550,
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80",
    category: "Fantasy"
  },
  {
    id: 7,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 499,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80",
    category: "Fiction"
  },
  {
    id: 8,
    title: "Circe",
    author: "Madeline Miller",
    price: 699,
    coverImage: "https://images.unsplash.com/photo-1633477189729-9290b3261d0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80",
    category: "Fantasy"
  }
];

// Store books in localStorage
const BOOKS_STORAGE_KEY = 'bookshop_books';

// Initialize books in localStorage if not present
const initializeBooks = () => {
  const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
  if (!storedBooks) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }
  return JSON.parse(storedBooks);
};

export const BookService = {
  // Create: Add a new book
  addBook: (book: Omit<BookType, 'id'>): BookType => {
    const books = BookService.getAllBooks();
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const newBook = { ...book, id: newId };
    
    const updatedBooks = [...books, newBook];
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
    
    return newBook;
  },
  
  // Read: Get all books
  getAllBooks: (): BookType[] => {
    return initializeBooks();
  },
  
  // Read: Get a single book by ID
  getBookById: (id: number): BookType | undefined => {
    const books = BookService.getAllBooks();
    return books.find(book => book.id === id);
  },
  
  // Update: Update an existing book
  updateBook: (updatedBook: BookType): BookType => {
    const books = BookService.getAllBooks();
    const updatedBooks = books.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    );
    
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
    return updatedBook;
  },
  
  // Delete: Remove a book
  deleteBook: (id: number): void => {
    const books = BookService.getAllBooks();
    const updatedBooks = books.filter(book => book.id !== id);
    
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
  }
};
