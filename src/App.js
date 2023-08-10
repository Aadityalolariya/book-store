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

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [books, setBooks] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const [pageInfo, setPageInfo] = useState({ pageIndex: 1, totalPages: 0 });
  useEffect(() => {
    const getCartItemCount = async () => {
      try {
        console.log(cookies.user.result.id);
        const allCartItems = (
          await axios.get(
            `https://book-e-sell-node-api.vercel.app/api/cart?userId=${cookies.user.result.id}`
          )
        ).data;
        console.log(allCartItems.result);
        setCartItemCount(allCartItems.result.length);
      } catch (error) {
        console.log(error);
      }
    };
    if (cookies.user) {
      getCartItemCount();
    }
  }, []);

  const addToCart = async (bookId) => {
    // if (!isInCart(id)) setCartBookIds([...cartBookIds, id]);
    try {
      const dataFetched = await axios.post(
        "https://book-e-sell-node-api.vercel.app/api/cart",
        {
          bookId: bookId,
          userId: cookies.user.result.id,
          quantity: 1,
        }
      );
      setCartItemCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const allCartItems = (
        await axios.get(
          `https://book-e-sell-node-api.vercel.app/api/cart?userId=${cookies.user.result.id}`
        )
      ).data;
      let cart_item_id = 0;
      allCartItems.result.forEach((element) => {
        if (bookId === element.bookId) {
          cart_item_id = element.id;
          return;
        }
      });
      await axios.delete(
        `https://book-e-sell-node-api.vercel.app/api/cart?id=${cart_item_id}`
      );
      setCartItemCount((prev) => prev - 1);
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
          cartItemCount
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
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
