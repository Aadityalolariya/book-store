import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Badge, Rating } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function ImgMediaCard({
  title,
  author,
  price,
  discount,
}) {
  return (
    <Badge
      color={discount ? "success" : "default"}
      sx={{ margin: "1rem" }}
      badgeContent={discount ? discount : ""}
    >
      <Card sx={{ maxWidth: 200, padding: "1rem" }} elevation={9}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="auto"
          image="/book1.jpeg"
        />
        <CardContent sx = {{paddingBottom : '0rem'}}>
          <Typography gutterBottom variant="body1" sx = {{fontWeight : 'bold'}} component="div">
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
            style={{ width: "100%", textAlign: "center", marginTop: "1rem" }}
          >
            <Rating name="read-only" value={4} readOnly />
          </div>
        </CardContent>
        <CardActions>
          <Button startIcon = {<ShoppingCartIcon/>} sx = {{margin : 'auto'}}>
            Add to Cart</Button>
        </CardActions>
      </Card>
    </Badge>
  );
}
