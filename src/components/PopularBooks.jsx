import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const BookCard = ({ title, author, cover, bookId }) => {
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/book/${id}`);

  return (
    <Card
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:transition-transform"
      onClick={() => handleClick(bookId)}
    >
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-50 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {cover ? (
            <img src={cover} alt={title} className="h-full w-full object-cover" />
          ) : (
            <span className="text-gray-500 dark:text-gray-400">No Cover</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-gray-600 dark:text-gray-300">{author}</CardDescription>
      </CardFooter>
    </Card>
  );
};

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBooks([
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image_url: "https://picsum.photos/200/300?random=1" },
        { id: 2, title: "1984", author: "George Orwell", image_url: "https://picsum.photos/200/300?random=2" },
        { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", image_url: "https://picsum.photos/200/300?random=3" },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen", image_url: "https://picsum.photos/200/300?random=4" },
        { id: 5, title: "Moby-Dick", author: "Herman Melville", image_url: "https://picsum.photos/200/300?random=5" },
        { id: 6, title: "War and Peace", author: "Leo Tolstoy", image_url: "https://picsum.photos/200/300?random=6" },
        { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", image_url: "https://picsum.photos/200/300?random=7" },
        { id: 8, title: "Crime and Punishment", author: "Fyodor Dostoevsky", image_url: "https://picsum.photos/200/300?random=8" },
        { id: 9, title: "The Hobbit", author: "J.R.R. Tolkien", image_url: "https://picsum.photos/200/300?random=9" },
        { id: 10, title: "Fahrenheit 451", author: "Ray Bradbury", image_url: "https://picsum.photos/200/300?random=10" },
        { id: 11, title: "Brave New World", author: "Aldous Huxley", image_url: "https://picsum.photos/200/300?random=11" },
        { id: 12, title: "The Odyssey", author: "Homer", image_url: "https://picsum.photos/200/300?random=12" },
        { id: 13, title: "Dune", author: "Frank Herbert", image_url: "https://picsum.photos/200/300?random=13" },
        { id: 14, title: "Les Misérables", author: "Victor Hugo", image_url: "https://picsum.photos/200/300?random=14" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <section id="books" className="my-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-10 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 font-purple-purse">Popular Books</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-72 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} title={book.title} author={book.author} cover={book.image_url} bookId={book.id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularBooks;