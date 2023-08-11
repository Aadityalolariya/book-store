import axios from "axios";

const API_URL = "https://book-e-sell-node-api.vercel.app/api/cart";

class CartService {
  // get cart item list
  GetCartItems = async (cookies) => {
    return await axios.get(`${API_URL}?userId=${cookies.user.result.id}`);
  };

  // delete from cart
  DeleteItemFromCart = async (cart_item_id) => {
    return await axios.delete(`${API_URL}?id=${cart_item_id}`);
  };

  // add to cart
  AddItemToCart = async (bookId, cookies) => {
    await axios.post(API_URL, {
      bookId: bookId,
      userId: cookies.user.result.id,
      quantity: 1,
    });
  };
}

export default new CartService();
