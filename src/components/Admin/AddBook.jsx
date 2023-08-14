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
import BookService from "../../api/BookService";
import Toaster from "../../utils/Toaster";
import { UserContext } from "../UserContext";
const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
    base64image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if all fields are filled
    if (
      book.name === "" ||
      book.price === "" ||
      book.categoryId === "" ||
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
    BookService.AddNewBook(book)
      .then((res) => {
        // handle axios response with status code
        if (res.status === 200) {
          Toaster({
            position: "top-right",
            condition: "success",
            msg: "Book Added Successfully",
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

  const convertToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = async (e) => {
    const image = e.target.files[0];
    const base64 = await convertToBase64(image);
    setBook({ ...book, base64image: base64 });
  };
  const { categories } = useContext(UserContext);

  return (
    <Container style={{ margin: "20px" }}>
      <Toaster />
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        Add Book
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
            <FormControl required sx = {{width : '50%'}}>
              <InputLabel id="categoryId-select">Category</InputLabel>
              <Select
                labelId="categoryId-select"
                id="demo-simple-select"
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    categoryId: e.target.value,
                  }))
                }
                value={book.categoryId}
                label="Category"
              >
                {categories.map((element, index) => {
                  return (
                    <MenuItem value={element.categoryId} key={`MenuItem_key_${index}`}>
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
              required
              onChange={(e) => handleImage(e)}
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
              Add Book
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={
                // clear the form
                () =>
                  setBook({
                    name: "",
                    price: "",
                    category: "",
                    description: "",
                    image: "",
                  })
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

export default AddBook;
