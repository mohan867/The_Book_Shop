
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Book, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export interface BookType {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
}

interface BookCardProps {
  book: BookType;
}

const BookCard = ({ book }: BookCardProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <div className="book-card bg-white rounded-lg overflow-hidden shadow-sm border hover:border-primary/10 transition-all duration-300 group">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>
      <div className="p-4 space-y-2">
        <div className="inline-block px-2 py-1 text-xs font-medium tracking-wide text-primary bg-primary/5 rounded-sm mb-2">
          {book.category}
        </div>
        <h3 className="font-serif font-medium line-clamp-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-medium text-primary">{formatPrice(book.price)}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="btn-hover-effect"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
