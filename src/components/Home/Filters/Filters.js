import React from "react";
import styles from "./Filters.module.css";
import Paper from "@mui/material/Paper";
// import { TextFields } from '@mui/icons-material';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Input } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";

export default function Filters({ price, setPrice }) {
  const handleChange = (event) => {
    setPrice(event.target.value);
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
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
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
            onChange={handleChange}
          >
            <MenuItem value="">Unset</MenuItem>
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
