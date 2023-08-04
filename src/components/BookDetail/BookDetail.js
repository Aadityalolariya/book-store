import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useSearchParams } from "react-router-dom";
import styles from "./BookDetail.module.css";
import Typography from "@mui/material/Typography";
import { Button, Rating } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function BookDetail({addToCart}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookDetail, setBookDetail] = useState({});

  useEffect(() => {
    console.log(searchParams.get("bookid"));
    async function getBookData() {
      try {
        const dataFetched = await getDoc(
          doc(db, "books", searchParams.get("bookid"))
        );
        const data = dataFetched.data();
        console.log(data);
        setBookDetail(data);
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
          <img src="/book1.jpeg" alt="NA" srcSet="" style={{ width: "100%" }} />
        </div>
        <div className={styles.details}>
          <Typography variant="h3">{bookDetail.title}</Typography>
          <Typography variant="h6">by {bookDetail.author}</Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              marginTop: "1rem",
            }}
          >
            <span>{bookDetail.rating}</span>
            {console.log(bookDetail.rating)}
            <Rating
              name="read-only"
              value={bookDetail.rating ? bookDetail.rating : 0}
            />
          </div>
          {bookDetail.discount ? (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
              <Typography variant="h6">Price :</Typography>
              <Typography variant="h6" className={styles.oldPrice}>
                &#8377;
                {parseFloat(
                  (bookDetail.price * 100) / (100 - bookDetail.discount)
                ).toFixed(2)}
              </Typography>{" "}
              <Typography variant="h6">&#8377;{bookDetail.price}</Typography>
            </div>
          ) : (
            <Typography sx={{ marginTop: "1rem" }} variant="h6">
              Price : {bookDetail.price}
            </Typography>
          )}

          <Typography variant="body2" sx = {{wordWrap : 'break-word', marginTop : '1rem'}}>
            Quantum mechanics is a fundamental theory in physics that provides a
            description of the physical properties of nature at the scale of
            atoms and subatomic particles.[2]: 1.1  It is the foundation of all
            quantum physics including quantum chemistry, quantum field theory,
            quantum technology, and quantum information science.
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
