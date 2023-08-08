import React, { useState } from "react";
import styles from "./Filters.module.css";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";

export default function Filters({ setMinMax, search, setSearch, books }) {
  const [price, setPrice] = useState("");
  const [searchText, setSearchText] = useState("");

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    const newPrice = event.target.value;
    let max, min;
    if (newPrice === "") {
      max = Infinity;
      min = 0;
    } else if (newPrice === "<100") {
      max = 99;
      min = 0;
    } else if (newPrice === ">500") {
      max = Infinity;
      min = 501;
    } else {
      min = parseInt(newPrice.split("-")[0]);
      max = parseInt(newPrice.split("-")[1]);
      console.log(min, max);
    }

    setMinMax({ min: min, max: max });
  };

  return (
    <>
      <Paper
        className={styles.container}
        sx={{ borderRadius: "20px" }}
        elevation={9}
      >
        <FormControl sx={{ m: 1, width: "30%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Search Book
          </InputLabel>

          <OutlinedInput
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={(e) => setSearch(searchText)}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search Book"
          />
        </FormControl>

        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={price}
            label="Price"
            onChange={handlePriceChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="<100"> &lt;100</MenuItem>
            <MenuItem value="100-300">100-300</MenuItem>
            <MenuItem value="301-500">301-500</MenuItem>
            <MenuItem value=">500"> &gt;500</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </>
  );
}
