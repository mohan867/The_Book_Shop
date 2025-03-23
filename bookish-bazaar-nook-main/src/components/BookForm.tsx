
import React, { useState, useEffect } from 'react';
import { BookType } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';

interface BookFormProps {
  onSubmit: (book: BookType) => void;
  initialData: BookType | null;
  isEditing: boolean;
  onCancel: () => void;
}

const defaultBook: BookType = {
  id: 0,
  title: '',
  author: '',
  price: 0,
  coverImage: '',
  category: '',
};

const BookForm = ({ onSubmit, initialData, isEditing, onCancel }: BookFormProps) => {
  const [formData, setFormData] = useState<BookType>(initialData || defaultBook);

  useEffect(() => {
    // Reset form when initialData changes
    setFormData(initialData || defaultBook);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Only reset the form if not editing
    if (!isEditing) {
      setFormData(defaultBook);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter book category"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price in rupees"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          {isEditing && (
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update' : 'Save'} Book
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookForm;
