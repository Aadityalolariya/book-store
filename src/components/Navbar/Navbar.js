import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Badge from '@mui/material/Badge';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const pages = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Admin",
    to: "/admin",
  }
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cartItemCount } = useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={
                  () => {
                    handleCloseNavMenu();
                  }
                }>
                  <Link to={page.to} >
                    <Typography textAlign="center" style={{ textDecoration: "none", color: "white" }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={
                  () => {
                    handleCloseNavMenu();
                  }
                }
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={page.to} style={{ textDecoration: "none", color: "white" }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Tooltip title="Cart">
            <Link to="/cart">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginRight: "2rem", marginTop: "4px" }}
              >
                <Badge badgeContent={cartItemCount} color="success">
                  <AddShoppingCartIcon style={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
          </Tooltip>
          <Link to="/login">
            <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;
