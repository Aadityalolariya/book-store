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
import { useNavigate } from "react-router-dom";

export default function BookCard({
  description,
  name,
  price,
  bookImage,
  addToCart,
  id,
  category,
}) {
  const navigate = useNavigate();
  const handleCardClick = () => {

    navigate({ pathname: "/book", search: `?id=${id}` });
  };
  return (
    <Card
      sx={{
        width: 200,
        padding: "1rem",
        margin: "auto",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginY: "1rem",
      }}
      elevation={9}
    >
      <div onClick={handleCardClick}>
        <CardMedia component="img" className={styles.book_img} alt="N/A" height="auto" image={bookImage} />
        <CardContent className={styles.content}>
          <Typography
            gutterBottom
            variant="body1"
            sx={{ fontWeight: "bold" }}
            component="div"
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Category: </b>
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Description: </b>
            {description.slice(0, 100)}
            {description.length > 100 ? "..." : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Price: </b>
            &#8377;{price}
          </Typography>
        </CardContent>
      </div>
      <div className={styles.cart_btn_wrap}>
        <CardActions sx={{ padding: "0px" }} className={styles.cart_btn}>
          <Button
            startIcon={<ShoppingCartIcon />}
            sx={{ margin: "auto" }}
            onClick={() => addToCart(id)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
