import axios from "axios";

const API_URL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
    // get all books
    GetAllBooks = async () => {
        return await axios.get(`${API_URL}/all`);
    };

    // Delete book by id
    DeleteBookById = async (id) => {
        return await axios.delete(`${API_URL}?id${id}`);
    };

    // Get book by id
    GetBookById = async (id) => {
        return await axios.get(`${API_URL}/byId?id=${id}`);
    }

    // Add new book
    AddNewBook = async (book) => {
        return await axios.post(`${API_URL}`, book);
    };

    // Update book
    UpdateBook = async (book) => {
        return await axios.put(`${API_URL}`, book);
    };
}

export default new BookService();