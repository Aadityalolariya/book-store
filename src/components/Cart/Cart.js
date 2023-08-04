import React, { useState, useEffect } from 'react'
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { CartItemCard } from './CartItemCard';
import style from './Cart.module.css';

const Cart = ({
    removeFromCart,
}) => {
    const [books, setBooks] = useState([]);
    const [bookids, setBookIds] = useState(
        () => JSON.parse(localStorage.getItem('cartBookIds')) || []
    );

    useEffect(() => {
        const getBookData = async () => {
            try {
                // get only book those id in bookids
                if (bookids.length === 0) return;
                const dataFetched = await getDocs(query(collection(db, "books"), where("id", "in", bookids)));
                const tempBooks = dataFetched.docs.map((doc) => doc.data());
                setBooks(tempBooks);
            } catch (error) {
                console.log(error);
            }
        };
        getBookData();
    }, [bookids]); // Make sure to run the effect whenever bookids change

    // handle remove from cart
    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
        setBookIds(bookids.filter((bookid) => bookid !== id));
    }

    return (
        <div className={style.container}>
            {books.length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                books.map((element, index) => (
                    <CartItemCard
                        author={element.author}
                        price={element.price}
                        title={element.title}
                        rating={element.rating}
                        bookImage="/book1.jpeg"
                        key={`Book_Key_${index}`}
                        id={element.id}
                        removeFromCart={handleRemoveFromCart}
                    />
                ))
            )}
        </div>
    )
}

export default Cart;