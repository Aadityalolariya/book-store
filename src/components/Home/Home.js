import React, { useState } from "react";
import styles from "./Home.module.css";
import BookCard from "../BookCard/BookCard.js";
import Filters from "./Filters/Filters";

const data = [
  {
    author: "author name",
    price: "300",
    discount: "10%",
    title: "book title",
    rating: 4,
    bookImage : '/book1.jpeg'
  },
  {
    author: "author name2",
    price: "200",
    discount: "",
    title: "book title2",
    rating: 2,
    bookImage : '/book1.jpeg'
  },
  {
    author: "author name",
    price: "300",
    discount: "10%",
    title: "book title",
    rating: 4,
    bookImage : '/book1.jpeg'
  },
  {
    author: "author name2",
    price: "200",
    discount: "",
    title: "book title2",
    rating: 5,
    bookImage : '/book1.jpeg'
  },
  {
    author: "author name",
    price: "300",
    discount: "10%",
    title: "book title",
    rating: 4,
    bookImage : '/book1.jpeg'
  },
  {
    author: "author name2",
    price: "200",
    discount: "",
    title: "book title2",
    rating: 5,
    bookImage : '/book1.jpeg'
  },
  {
    author: "author name",
    price: "300",
    discount: "10%",
    title: "book title",
    rating: 4,
    bookImage : '/book1.jpeg'
  },
];

export default function Home() {

    const [price, setPrice] = useState('')
  return (
    <>
    <Filters setPrice = {setPrice} price = {price}/>
      <div className={styles.container}>
        {data.map((element, index) => {
          return (
            <BookCard
              author={element.author}
              discount={element.discount}
              price={element.price}
              title={element.title}
              rating={element.rating}
              bookImage = {element.bookImage}
              key={`Book_Key_${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
