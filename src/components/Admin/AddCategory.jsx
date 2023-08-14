import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Categories from "../../api/Categories";
import Toaster from "../../utils/Toaster";
export default function AddCategory({
  categories,
  setCategories,
  setOpenCategory,
  setCategoryUpdateId,
}) {
  const [category, setCategory] = useState("");
  const columns = [
    { field: "category", headerName: "Category", width: 300 },
    { field: "categoryId", headerName: "Category Id", width: 170 },
    {
      sortable: false,
      width: 180,
      renderCell: ({ id }) => (
        <Button
          key={id}
          onClick={(e) => {
            setOpenCategory(true);
            setCategoryUpdateId(id);
          }}
          sx={{ margin: "auto" }}
          variant="outlined"
        >
          Update
        </Button>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    let arr = [];
    categories &&
      categories.forEach((element) => {
        arr.push(element);
      });
    setRows(arr);
  }, [categories]);

  const handleAddCategory = async () => {
    if (category === "") {
      Toaster({
        position: "top-right",
        condition: "error",
        msg: "Enter the category name",
      });
      return;
    }
    try {
      const data = await Categories.AddCategory(category);
      setCategories((prev) => [
        ...prev,
        { category: data.name, categoryId: data.id },
      ]);
      Toaster({
        position: "top-right",
        condition: "success",
        msg: "Category Added Successfully",
      });
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        Categories
      </Typography>
      <DataGrid
        rowSelection={false}
        getRowId={(element) => element.categoryId}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
      <form style={{ margin: "2rem" }}>
        <Grid container spacing={1} sx={{ margin: "auto" }}>
          <Grid item xs={12} sm={6}>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              placeholder="Category name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleAddCategory}>
              Add category
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
