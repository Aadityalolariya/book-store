import React, { useState } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import styles from "./Admin.module.css";
import Toaster from "../../utils/Toaster";
import BookService from "../../api/BookService";

const UpdateBook = ({ ubook, handleClose }) => {
  const [book, setBook] = useState(ubook);

  const [updatebook, setUpdateBook] = useState({
    id: book.id,
    name: book.name,
    price: book.price,
    category: book.category,
    description: book.description,
    base64image: book.base64image,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if all fields are filled
    if (
      book.name === "" ||
      book.price === "" ||
      book.category === "" ||
      book.description === "" ||
      book.base64image === ""
    ) {
      Toaster({
        position: "top-right",
        condition: "error",
        msg: "Please fill all the fields",
      });
      return;
    }
    BookService.UpdateBook(updatebook)
      .then((res) => {
        // handle axios response with status code
        if (res.status === 200) {
          Toaster({
            position: "top-right",
            condition: "success",
            msg: "Book Updated Successfully",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Toaster({
          position: "top-right",
          condition: "error",
          msg: err.message,
        });
      });
  };

  return (
    <Container style={{ margin: "20px" }}>
        <Toaster />
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        Update Book with id: {book.id}
      </Typography>
      {/* form with name, price, category, description image */}
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <input
              type="text"
              placeholder="Book Name"
              required
              value={book.name}
              onChange={(e) => setBook({ ...book, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="number"
              placeholder="Price"
              required
              value={book.price}
              onChange={(e) => setBook({ ...book, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="text"
              placeholder="Category"
              required
              value={book.category}
              onChange={(e) => setBook({ ...book, category: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <textarea
              placeholder="Description"
              rows="4"
              cols="50"
              required
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) =>
                setBook({ ...book, base64image: e.target.value })
              }
            />
          </Grid>
          {/* Image */}
          <Grid item xs={12} sm={6}>
            {/* base64image */}
            <img
              src={book.base64image}
              alt={book.name}
              className={styles.bookImg}
            />
          </Grid>
        </Grid>
        {/* buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Update Book
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={
                // clear the form
                () => handleClose()
              }
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateBook;
