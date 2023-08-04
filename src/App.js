import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Cart from "./components/Cart/Cart";
import BookDetail from "./components/BookDetail/BookDetail.js";

function App() {
  const [cartBookIds, setCartBookIds] = useState(
    () => JSON.parse(localStorage.getItem("cartBookIds")) || []
  );

  const addToCart = (id) => {
    if (!isInCart(id)) setCartBookIds([...cartBookIds, id]);
  };

  const removeFromCart = (id) => {
    setCartBookIds((prev) => prev.filter((bookId) => bookId !== id));
  };

  const isInCart = (id) => {
    return cartBookIds.includes(id);
  };

  const getCartCount = () => {
    return cartBookIds.length;
  };

  const getCartBookId = () => {
    return cartBookIds;
  };

  useEffect(() => {
    localStorage.setItem("cartBookIds", JSON.stringify(cartBookIds));
  }, [cartBookIds]);

  return (
    <>
      {/* <BookCard title = 'Quantum Mechanics' author = "Author Name" price = "300" discount='20% OFF'/> */}
      {/* <div>App</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout cartCount={getCartCount()} />}>
            <Route path="/" element={<Home addToCart={addToCart} />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
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
