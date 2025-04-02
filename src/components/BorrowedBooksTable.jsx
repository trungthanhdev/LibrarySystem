import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAdminStore } from "@/stores/useAdminStore";

function BorrowedBooksTable({ bookId }) {
  const { getBorrowedBooks, borrowedBooks, loading } = useAdminStore();

  useEffect(() => {
    getBorrowedBooks();
  }, [getBorrowedBooks]);

  // Mock data cho borrowedBooks (dùng khi không có dữ liệu từ store)
  const mockBorrowedBooks = [
    {
      book_id: 1,
      title: "The Great Gatsby",
      user_name: "John Doe",
      email: "john.doe@example.com",
      contact: "123-456-7890",
      borrowed_date: "2025-03-15T10:00:00Z",
    },
    {
      book_id: 1,
      title: "The Great Gatsby",
      user_name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "098-765-4321",
      borrowed_date: "2025-03-20T14:30:00Z",
    },
    {
      book_id: 2,
      title: "1984",
      user_name: "Alice Johnson",
      email: "alice.j@example.com",
      contact: "555-123-4567",
      borrowed_date: "2025-03-18T09:15:00Z",
    },
    {
      book_id: 3,
      title: "To Kill a Mockingbird",
      user_name: "Bob Brown",
      email: "bob.brown@example.com",
      contact: "444-555-6666",
      borrowed_date: "2025-03-22T16:45:00Z",
    },
  ];

  // Sử dụng mock data nếu borrowedBooks từ store rỗng
  const dataToUse = borrowedBooks && borrowedBooks.length > 0 ? borrowedBooks : mockBorrowedBooks;

  // Lọc danh sách mượn theo bookId
  const filteredBorrowedBooks = dataToUse.filter(
    (book) => book.book_id === parseInt(bookId)
  );

  // Export data as CSV
  const exportToCSV = () => {
    if (!filteredBorrowedBooks || filteredBorrowedBooks.length === 0) return;

    const headers = [
      "Book Title",
      "User Name",
      "User Email",
      "Contact",
      "Borrowed Date",
    ];

    const csvData = filteredBorrowedBooks.map((book) => [
      book.title,
      book.user_name,
      book.email,
      book.contact,
      new Date(book.borrowed_date).toDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" ? `"${cell.replace(/"/g, '""')}"` : cell
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const date = new Date().toISOString().split("T")[0];
    link.setAttribute("href", url);
    link.setAttribute("download", `borrowed-books-report-${date}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Borrowed History</h2>
        <Button
          onClick={exportToCSV}
          className="flex items-center gap-2"
          variant="default"
          disabled={!filteredBorrowedBooks || filteredBorrowedBooks.length === 0}
        >
          <Download size={16} />
          Export as CSV
        </Button>
      </div>

      {filteredBorrowedBooks && filteredBorrowedBooks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Book Title</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Borrowed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBorrowedBooks.map((borrowedBook, index) => (
              <TableRow key={`${borrowedBook.book_id}-${index}`}>
                <TableCell className="font-medium">
                  {borrowedBook.title}
                </TableCell>
                <TableCell>{borrowedBook.user_name}</TableCell>
                <TableCell>{borrowedBook.email}</TableCell>
                <TableCell>{borrowedBook.contact}</TableCell>
                <TableCell>
                  {new Date(borrowedBook.borrowed_date).toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          No borrowing history for this book
        </div>
      )}
    </div>
  );
}

export default BorrowedBooksTable;