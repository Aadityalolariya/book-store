import React from 'react'
import styles from './Footer.module.css'
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
export default function Footer() {
  return (
    <>
        <div className={styles.container}>
            
           <div>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

           </div>
            
            <ul className={styles.list}>
                <li><a href = '/'>Home</a></li>
                <li><a href = '/'>Sign In</a></li>
                <li><a href = '/'>Sign Up</a></li>
            </ul>
            <ul className={styles.list}>
                <li><a href = '/cart'>Cart</a></li>
                <li><a href = '/'>Products</a></li>
                <li><a href = '/'>Services</a></li>
            </ul>
            <ul className={styles.list}>
                <li><a href = '/'>Contact Us</a></li>
                <li><a href = '/'>Feedback</a></li>
                <li><a href = '/'>Help</a></li>
            </ul>
        </div>
    </>
  )
}
