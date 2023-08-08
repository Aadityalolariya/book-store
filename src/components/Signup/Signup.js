import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useState } from "react";
import bookImg from '../bookImg.jpg';

export default function SignInSide() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [detail, setDetail] = useState({fname : '', lname : '', email : '', password : ''});
  const handleSignUp = async (event) => {
    if(detail.fname === '' || detail.lname === '' || detail.email === '' || detail.password === '' ){
      alert('Please provide all the credentials!!');
      return;
    }

    try {
      const dataFetched = await axios.post(
        "https://book-e-sell-node-api.vercel.app/api/user",
        {
          firstName : detail.fname,
          lastName : detail.lname,
          email : detail.email,
          roleId : 2,
          password : detail.password
        }
      );
      const userData = dataFetched.data;
      console.log(userData);
      // setUserDetail(userData);
      setCookie('user', JSON.stringify(userData), { path: '/' });
      setDetail({fname : '', lname : '', email : '', password : ''})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx = {{marginBottom : '4rem'}}>
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${bookImg})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fname"
                  label="First name"
                  name="fname"
                  autoFocus
                  value={detail.fname}
                  onChange={(e) => setDetail((prev) => ({...prev, fname : e.target.value}))}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lname"
                  label="Last name"
                  name="lname"
                  autoFocus
                  value={detail.lname}
                  onChange={(e) => setDetail((prev) => ({...prev, lname : e.target.value}))}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={detail.email}
                  onChange={(e) => setDetail((prev) => ({...prev, email : e.target.value}))}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={detail.password}
                  onChange={(e) => setDetail((prev) => ({...prev, password : e.target.value}))}
                />
                <Button
                  onClick={handleSignUp}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                 
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}