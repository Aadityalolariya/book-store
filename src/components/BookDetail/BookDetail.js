import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./BookDetail.module.css";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import { UserContext } from "../UserContext";
export default function BookDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookDetail, setBookDetail] = useState({});
  const { addToCart } = useContext(UserContext);
  useEffect(() => {
    async function getBookData() {
      try {
        const dataFetched = await axios.get(
          `https://book-e-sell-node-api.vercel.app/api/book/byId?id=${searchParams.get(
            "id"
          )}`
        );
        const data = dataFetched.data;
        console.log(data);
        setBookDetail(data.result);
      } catch (error) {
        console.log(error);
      }
    }
    getBookData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgSection}>
          <img
            src={bookDetail.base64image}
            alt="NA"
            srcSet=""
            style={{ width: "100%" }}
          />
        </div>
        <div className={styles.details}>
          <Typography variant="h3">{bookDetail.name}</Typography>
          <Typography variant="h6">Category : {bookDetail.category}</Typography>

          <Typography sx={{ marginTop: "1rem" }} variant="h6">
            Price : {bookDetail.price}
          </Typography>

          <Typography
            variant="body2"
            sx={{ wordWrap: "break-word", marginTop: "1rem" }}
          >
            {bookDetail.description}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "2rem", width: "50%" }}
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addToCart(bookDetail.id)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </>
  );
}
