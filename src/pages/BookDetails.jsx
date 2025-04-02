import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BorrowedBooksTable from "../components/BorrowedBooksTable"; // Import component

const BookDetails = () => {
  const { bookId } = useParams(); // Lấy bookId từ URL
  const [book, setBook] = useState(null);

  // Dữ liệu giả (mock data)
  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel about the American dream and the disillusionment of the 1920s.",
      coverImage: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel set in a totalitarian regime.",
      coverImage: "https://picsum.photos/200/300?random=2",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A novel about racial injustice and the loss of innocence in the American South.",
      coverImage: "https://picsum.photos/200/300?random=3",
    },
    // Thêm các sách khác nếu cần
  ];

  useEffect(() => {
    const selectedBook = mockBooks.find((book) => book.id === parseInt(bookId));
    setBook(selectedBook);
  }, [bookId]);

  if (!book) {
    return <div className="p-4 text-center">Book not found!</div>;
  }

  return (
    <div className="book-details p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thông tin sách */}
        <div className="flex-shrink-0">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {book.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Description:</strong> {book.description}
          </p>
        </div>
      </div>

      {/* Lịch sử mượn sách */}
      <BorrowedBooksTable bookId={bookId} />
    </div>
  );
};

export default BookDetails;