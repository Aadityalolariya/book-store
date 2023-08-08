import React, { useState, useEffect } from "react";
import { CartItemCard } from "./CartItemCard";
import style from "./Cart.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const Cart = ({ removeFromCart }) => {
  const [books, setBooks] = useState([]);
 
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const allCartItems = (
          await axios.get(
            `https://book-e-sell-node-api.vercel.app/api/cart?userId=${cookies.user.result.id}`
          )
        ).data;
        console.log(allCartItems.result);
        setBooks(allCartItems.result);
      } catch (error) {
        console.log(error);
      }
    };
    getCartItems();
  }, []); // Make sure to run the effect whenever bookids change


  return (
    <div className={style.container}>
      {books.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        books.map((element, index) => {
          return (
            <CartItemCard
              removeFromCart={removeFromCart}
              description={element.book.description}
              name={element.book.name}
              price={element.book.price}
              bookImage={element.book.base64image}
              key={`Book_Key_${element.book.id}`}
              id={element.book.id}
              category={element.book.category}
              setBooks = {setBooks}
            />
          );
        })
      )}
    </div>
  );
};

export default Cart;
