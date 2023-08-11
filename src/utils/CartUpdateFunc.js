import CartService from "../api/CartService";

export const addItemToCart = async (bookId, cookies, setCartItemCount) => {
  try {
    const dataFetched = await CartService.AddItemToCart(bookId, cookies);
    setCartItemCount((prev) => prev + 1);
  } catch (error) {
    console.log(error);
  }
};

export const removeItemFromCart = async (cookies, setCartItemCount, bookId) => {
  try {
    const allCartItems = (await CartService.GetCartItems(cookies)).data;
    let cart_item_id = 0;
    allCartItems.result.forEach((element) => {
      if (bookId === element.bookId) {
        cart_item_id = element.id;
        return;
      }
    });

    CartService.DeleteItemFromCart(cart_item_id);
    setCartItemCount((prev) => prev - 1);
  } catch (error) {
    console.log(error);
  }
};
