import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export const CartItemCard = ({
  removeFromCart,
  description,
  name,
  price,
  bookImage,
  id,
  category,
  setBooks,
}) => {
  const handleRemoveItem = (id) => {
    setBooks((prev) => {
      let updatedList = [];
      prev.forEach(element => {
        if(id !== element.book.id){
          updatedList.push(element);
        }
      });
      return updatedList;
    })
    removeFromCart(id);
  }
  return (
    <Card
      sx={{
        maxWidth: 200,
        padding: "1rem",
        margin: "auto",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginY: "1rem"
      }}
      elevation={9}
    >
      <CardMedia component="img" alt="N/A" height="auto" image={bookImage} />
      <CardContent sx={{ paddingBottom: "0rem" }}>
        <Typography
          gutterBottom
          variant="body1"
          sx={{ fontWeight: "bold" }}
          component="div"
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Description: </b>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price: </b>
          &#8377;{price}
        </Typography>
        
      </CardContent>
      <CardActions sx={{ padding: "0px" }}>
        <Button
          startIcon={<RemoveShoppingCartIcon />}
          sx={{ margin: "auto" }}
          // onClick={() => removeFromCart(id)}
          onClick={() => handleRemoveItem(id)}
        >
          Remove from Cart
        </Button>
      </CardActions>
    </Card>
  );
};
