import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./Admin.module.css";
import Toaster from "../../utils/Toaster";
import BookService from "../../api/BookService";
import { UserContext } from "../UserContext";

const UpdateBook = ({ ubook, handleClose }) => {
  const { categories } = useContext(UserContext);
  const [book, setBook] = useState(ubook);

  const [updatebook, setUpdateBook] = useState({
    id: book.id,
    name: book.name,
    price: book.price,
    categoryId: book.categoryId,
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
              value={updatebook.name}
              onChange={(e) =>
                setUpdateBook((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="number"
              placeholder="Price"
              required
              value={updatebook.price}
              onChange={(e) =>
                setUpdateBook((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required sx={{ width: "50%" }}>
              <InputLabel id="categoryId-select">Category</InputLabel>
              <Select
                labelId="categoryId-select"
                id="demo-simple-select"
                onChange={(e) =>
                  setUpdateBook((prev) => {
                    console.log(e.target.value);
                    return {
                      ...prev,
                      categoryId: e.target.value,
                    };
                  })
                }
                value={updatebook.categoryId}
                label="Category"
              >
                {categories.map((element, index) => {
                  return (
                    <MenuItem value={element.categoryId}>
                      {element.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <textarea
              placeholder="Description"
              rows="4"
              cols="50"
              required
              value={updatebook.description}
              onChange={(e) =>
                setUpdateBook((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) =>
                setUpdateBook((prev) => ({
                  ...prev,
                  base64image: e.target.value,
                }))
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
