
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookCard, { BookType } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, BookOpen, Award, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BookService } from '@/services/BookService';

const categories = [
  { name: "Fiction", count: 45 },
  { name: "Non-Fiction", count: 38 },
  { name: "Mystery", count: 27 },
  { name: "Biography", count: 23 },
  { name: "Self-Help", count: 19 },
  { name: "Fantasy", count: 32 },
  { name: "Science Fiction", count: 24 },
  { name: "History", count: 18 },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<BookType[]>([]);
  
  useEffect(() => {
    // Read operation - Get all books
    const loadedBooks = BookService.getAllBooks();
    setBooks(loadedBooks);
  }, []);
  
  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    searchQuery === '' || 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-semibold mb-3">Browse by Category</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find your next read from our carefully curated collection of books across genres.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {category.count} books
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="group">
                View All Categories
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Books */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="font-serif text-3xl font-semibold mb-2">Featured Books</h2>
                <p className="text-muted-foreground max-w-xl">
                  Our handpicked selection of must-read books for you.
                </p>
              </div>
              <div className="mt-4 md:mt-0 relative w-full md:w-64">
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No books found matching your search criteria.</p>
                </div>
              )}
            </div>
            
            <div className="text-center mt-12">
              <Button>
                Explore All Books
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-semibold mb-3">Why Choose BookishBazaar</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Experience the difference with our commitment to quality and service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">Curated Collection</h3>
                <p className="text-muted-foreground text-sm">
                  Every book in our collection is hand-selected for quality and relevance.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">Premium Quality</h3>
                <p className="text-muted-foreground text-sm">
                  We ensure all our books meet the highest standards of printing and binding.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Enjoy quick and reliable shipping across Tamil Nadu and all of India.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subscribe Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
                Stay updated with our latest arrivals, exclusive offers, and literary events.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="bg-white text-primary hover:bg-white/90 hover:text-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
