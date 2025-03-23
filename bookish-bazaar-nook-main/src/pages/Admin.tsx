
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookForm from '@/components/BookForm';
import { BookType } from '@/components/BookCard';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';
import { BookService } from '@/services/BookService';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load books when component mounts
    const loadedBooks = BookService.getAllBooks();
    setBooks(loadedBooks);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddBook = (book: BookType) => {
    // Create operation
    const newBook = BookService.addBook(book);
    setBooks([...books, newBook]);
    toast({
      title: "Book Added",
      description: `${book.title} has been added to the inventory.`,
    });
  };

  const handleUpdateBook = (updatedBook: BookType) => {
    // Update operation
    BookService.updateBook(updatedBook);
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    setIsEditing(false);
    setCurrentBook(null);
    toast({
      title: "Book Updated",
      description: `${updatedBook.title} has been updated.`,
    });
  };

  const handleDeleteBook = (id: number) => {
    // Delete operation
    BookService.deleteBook(id);
    setBooks(books.filter(book => book.id !== id));
    toast({
      title: "Book Deleted",
      description: "The book has been removed from the inventory.",
    });
  };

  const handleEdit = (book: BookType) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentBook(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold">Book Inventory Management</h1>
            <p className="text-muted-foreground">Manage your book inventory with CRUD operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {isEditing ? 'Edit Book' : 'Add New Book'}
                </h2>
                <BookForm 
                  onSubmit={isEditing ? handleUpdateBook : handleAddBook} 
                  initialData={currentBook} 
                  isEditing={isEditing}
                  onCancel={cancelEdit}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="font-medium">Book Inventory</h2>
                  <div className="text-sm text-muted-foreground">
                    {books.length} {books.length === 1 ? 'book' : 'books'} in inventory
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            No books in inventory. Add a book to get started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        books.map((book) => (
                          <TableRow key={book.id}>
                            <TableCell className="font-medium">{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.category}</TableCell>
                            <TableCell>{formatPrice(book.price)}</TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEdit(book)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteBook(book.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
