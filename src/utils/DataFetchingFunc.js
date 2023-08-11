import BookService from "../api/BookService";
import CartService from "../api/CartService";
import Categories from "../api/Categories";

export async function getBookDataWithPagination(
  pageInfo,
  search,
  setPageInfo,
  setBooks,
  setLoading
) {
  try {
    const data = await (
      await BookService.GetBookByPageSize(10, pageInfo.pageIndex, search)
    ).data;
    setPageInfo((prev) => ({
      ...prev,
      totalPages: data.result.totalPages,
    }));
    setBooks(data.result.items);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}

export const getCartItemCount = async (cookies, setCartItemCount) => {
  try {
    const allCartItems = (await CartService.GetCartItems(cookies)).data;
    console.log(allCartItems.result);
    setCartItemCount(allCartItems.result.length);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesList = async (setCategories) => {
    const dataFetched = await Categories.GetAllCategories();
    setCategories(dataFetched);
    console.log(dataFetched);
  };
