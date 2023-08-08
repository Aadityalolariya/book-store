import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import BookDetail from "./components/BookDetail/BookDetail.js";
import axios from "axios";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [books, setBooks] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartBookIds, setCartBookIds] = useState(
    () => JSON.parse(localStorage.getItem("cartBookIds")) || []
  );
  const [pageInfo, setPageInfo] = useState({ pageIndex: 1, totalPages: 0 });

  useEffect(() => {
    const getCartItemCount = async () => {
      try {
        console.log(cookies.user.result.id);
        const allCartItems = (await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${cookies.user.result.id}`)).data
        console.log(allCartItems.result);
        setCartItemCount(allCartItems.result.length);
      } catch (error) {
        console.log(error);
      }
    };
    getCartItemCount()
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
      setCartItemCount((prev) => prev + 1)

    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const allCartItems = (
        await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${cookies.user.result.id}`)
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

  useEffect(() => {
    localStorage.setItem("cartBookIds", JSON.stringify(cartBookIds));
  }, [cartBookIds]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout cartCount={cartItemCount} />}>
            <Route
              path="/"
              element={
                <Home
                  addToCart={addToCart}
                  books={books}
                  setBooks={setBooks}
                  pageInfo={pageInfo}
                  setPageInfo={setPageInfo}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={<Login />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup />}
            ></Route>
            <Route
              path="/book"
              element={<BookDetail addToCart={addToCart} />}
            ></Route>

            <Route
              path="/cart"
              element={<Cart removeFromCart={removeFromCart} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// "email": "testingguser1@gmail.com",
//     "password": "test1"
