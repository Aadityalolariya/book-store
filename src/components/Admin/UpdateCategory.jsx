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
import Categories from "../../api/Categories";
const UpdateCategory = ({ categoryUpdateId }) => {
  const { setCategories } = useContext(UserContext);

  const [categoryName, setCategoryName] = useState("");

  const handleUpdateCategory = async () => {
    try {
      const data = await Categories.UpdateCategory(
        categoryUpdateId,
        categoryName
      );
      console.log(data);
      Toaster({
        position: "top-right",
        condition: "success",
        msg: "Category Updated Successfully",
      });
      setCategories((prev) => {
        let arr = prev;
        prev.forEach((element) => {
          if (element.categoryId === categoryUpdateId) {
            element.category = categoryName;
            return arr;
          }
        });
        return arr;
      });
      setCategoryName("");
      
    } catch (error) {
      Toaster({
        position: "top-right",
        condition: "error",
        msg: "Some error occured!",
      });
      console.log(error);
    }
  };
  return (
    <Container style={{ margin: "20px" }}>
      <Toaster />
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        Update Category with id : {categoryUpdateId}
      </Typography>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        {/* <div> */}
        <input
          type="text"
          placeholder="New Category Name"
          required
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {/* </div>
        <div> */}
        <Button variant="contained" onClick={handleUpdateCategory}>
          Update category
        </Button>
        {/* </div> */}
      </div>
    </Container>
  );
};

export default UpdateCategory;
