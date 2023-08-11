import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import BookDetail from "./components/BookDetail/BookDetail.js";
import Admin from "./components/Admin/Admin";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "./components/UserContext";
import { getCartItemCount, getCategoriesList } from "./utils/DataFetchingFunc";
import { addItemToCart, removeItemFromCart } from "./utils/CartUpdateFunc";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [books, setBooks] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [pageInfo, setPageInfo] = useState({ pageIndex: 1, totalPages: 0 });

  useEffect(() => {
    if (cookies.user) {
      getCartItemCount(cookies, setCartItemCount);
    }
    getCategoriesList(setCategories);
  }, []);

  const addToCart = async (bookId) => {
    try {
      await addItemToCart(bookId, cookies, setCartItemCount);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await removeItemFromCart(cookies, setCartItemCount, bookId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          books,
          setBooks,
          cartItemCount,
          setCartItemCount,
          pageInfo,
          setPageInfo,
          addToCart,
          removeFromCart,
          cartItemCount,
          categories,
          setCategories,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/book" element={<BookDetail />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

// "email": "testingguser1@gmail.com",
//     "password": "test1"
