import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import BookCard from "../BookCard/BookCard.js";
import Filters from "./Filters/Filters";
import { Pagination } from "@mui/material";
import { UserContext } from "../UserContext";
import axios from "axios";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";
export default function Home() {
  const [search, setSearch] = useState("");
  const [minMax, setMinMax] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState("");
  const [loading,setLoading] = useState(true);
  const { books, setBooks, pageInfo, setPageInfo, addToCart } =
    useContext(UserContext);

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
    let dupBooks = books;
    dupBooks = dupBooks.sort((a, b) => {
      if (a[event.target.value] < b[event.target.value]) return -1;
      else if (a[event.target.value] > b[event.target.value]) return 1;
      return 0;
    });
    setBooks(dupBooks);
  };

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
        setBooks(data.result.items);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBookData();
  }, [pageInfo.pageIndex, search]);
  if(loading)
  return(
    <Grid container wrap="wrap" sx={{mx:5}}>
      {(loading ? Array.from(new Array(12)) : []).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="20%" />
            </Box>
        </Box>
      ))}
    </Grid>
    )
  return (
    <>
      <Filters
        setMinMax={setMinMax}
        books={books}
        setBooks={setBooks}
        setSearch={setSearch}
        sortBy={sortBy}
        handleSortBy={handleSortBy}
      />

      <div className={styles.container}>
        {books.map((element, index) => {
          if (element.price <= minMax.max && element.price >= minMax.min) {
            return (
              <BookCard
                description={element.description}
                name={element.name}
                price={element.price}
                bookImage={element.base64image}
                key={`Book_Key_${element._id}_${index}`}
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
