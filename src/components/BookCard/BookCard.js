import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./BookCard.module.css";

export default function BookCard({ title, author, price, discount, rating, bookImage }) {
  return (
    <Card
      sx={{
        maxWidth: 200,
        padding: "1rem",
        margin: "auto",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginY : '1rem'
      }}
      elevation={9}
    >
      <div style={{display : discount ? 'block' : 'none'}} className={styles.discount}>{discount} OFF</div>
      <CardMedia
        component="img"
        alt="N/A"
        height="auto"
        image={bookImage}
      />
      <CardContent sx={{ paddingBottom: "0rem" }}>
        <Typography
          gutterBottom
          variant="body1"
          sx={{ fontWeight: "bold" }}
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Author: </b>
          {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price: </b>
          &#8377;{price}
        </Typography>
        <div
          style={{ width: "100%", textAlign: "center", marginTop: "0.2rem" }}
        >
          <Rating name="read-only" value={rating} readOnly />
        </div>
      </CardContent>
      <CardActions sx={{ padding: "0px" }}>
        <Button startIcon={<ShoppingCartIcon />} sx={{ margin: "auto" }}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
