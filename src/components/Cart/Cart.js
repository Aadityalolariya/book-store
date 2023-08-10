import React, { useState, useEffect, useContext } from "react";
import { CartItemCard } from "./CartItemCard";
import style from "./Cart.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "../UserContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

const Cart = () => {
  const [cartBooks, setCartBooks] = useState([]);
  const {removeFromCart} = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const allCartItems = (
          await axios.get(
            `https://book-e-sell-node-api.vercel.app/api/cart?userId=${cookies.user.result.id}`
          )
        ).data;
        setCartBooks(allCartItems.result);
      } catch (error) {
        console.log(error);
      }
    };
    if(cookies.user){
      getCartItems();
    }
  }, []); // Make sure to run the effect whenever bookids change


  return (
    <div className={style.container}>
      {cartBooks.length === 0 ? (
        <Alert severity="info"  className={style.alert} action={
          <a href="/"><Button color="primary" size="small">
            Explore Books
          </Button></a>
        }>
        <AlertTitle>Info</AlertTitle>
         Cart is empty..!
      </Alert>
      ) : (
        cartBooks.map((element, index) => {
          return (
            <CartItemCard
              description={element.book.description}
              name={element.book.name}
              price={element.book.price}
              bookImage={element.book.base64image}
              key={`Book_Key_${element.book.id}`}
              id={element.book.id}
              category={element.book.category}
              setCartBooks = {setCartBooks}
            />
          );
        })
      )}
    </div>
  );
};

export default Cart;
