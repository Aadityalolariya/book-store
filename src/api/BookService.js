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
}

export default new BookService();