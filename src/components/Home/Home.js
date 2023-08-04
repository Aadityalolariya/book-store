import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import BookCard from "../BookCard/BookCard.js";
import Filters from "./Filters/Filters";
import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home({ addToCart }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [minMax, setMinMax] = useState({ min: 0, max: Infinity });

  useEffect(() => {
    const getBookData = async () => {
      try {
        const dataFetched = await getDocs(query(collection(db, "books")));
        dataFetched.forEach((element) => {
          setBooks((prev) => [...prev, element.data()]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getBookData();
  }, []);

  return (
    <>
      <Filters setMinMax={setMinMax} search={search} setSearch={setSearch} books={books} />
      <div className={styles.container}>
        {books.map((element, index) => {
          if (element.price <= minMax.max && element.price >= minMax.min && element.title.includes(search)) {
            return (
              <BookCard
                author={element.author}
                discount={element.discount}
                price={element.price}
                title={element.title}
                rating={element.rating}
                bookImage="/book1.jpeg"
                key={`Book_Key_${index}`}
                addToCart={addToCart}
                id={element.id}
              />
            );
          }
          else return (<></>);
        })}
      </div>
    </>
  );
}
