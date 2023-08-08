import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import BookCard from "../BookCard/BookCard.js";
import Filters from "./Filters/Filters";
import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { Pagination } from "@mui/material";
import axios from "axios";
export default function Home({
  addToCart,
  books,
  setBooks,
  setCurrentBook,
  pageInfo,
  setPageInfo,
}) {
  const [search, setSearch] = useState("");
  const [minMax, setMinMax] = useState({ min: 0, max: Infinity });

  useEffect(() => {
    const getBookData = async () => {
      try {
        const dataFetched = await axios.get(
          `https://book-e-sell-node-api.vercel.app/api/book?pageSize=10&pageIndex=${
            pageInfo.pageIndex
          }${search.length > 0 ? `&keyword=${search}` : ""}`
        );
        const data = dataFetched.data;
        setPageInfo((prev) => ({
          ...prev,
          totalPages: data.result.totalPages,
        }));
        console.log(data.result.items);
        setBooks(data.result.items);
      } catch (error) {
        console.log(error);
      }
    };
    getBookData();
  }, [pageInfo.pageIndex, search]);

  return (
    <>
      <Filters
        setMinMax={setMinMax}
        search={search}
        setSearch={setSearch}
        books={books}
      />
      <div className={styles.container}>
        {books.map((element, index) => {
          if (
            element.price <= minMax.max &&
            element.price >= minMax.min
          ) {
          return (
            <BookCard
              setCurrentBook={setCurrentBook}
              description={element.description}
              name={element.name}
              price={element.price}
              bookImage={element.base64image}
              key={`Book_Key_${element.id}`}
              addToCart={addToCart}
              id={element.id}
              category={element.category}
              
            />
          );
          } else return <></>;
        })}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Pagination
          sx={{ margin: "2rem" }}
          onChange={(e, page) =>
            setPageInfo((prev) => ({ ...prev, pageIndex: page }))
          }
          count={pageInfo.totalPages}
          color="primary"
        />
      </div>
    </>
  );
}
