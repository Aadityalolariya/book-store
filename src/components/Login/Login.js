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
import axios from "axios";
import { useState } from "react";
import { useCookies } from 'react-cookie';
import bookImg from '../bookImg.jpg';

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleLogin = async () => {
    if(email === '' || password === ''){
      alert('Please provide all the credentials!!!');
      return;
    }

    try {
      const dataFetched = await axios.post(
        "https://book-e-sell-node-api.vercel.app/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      const userData = dataFetched.data;
      console.log(userData);
      setCookie('user', JSON.stringify(userData), { path: '/' });
      setEmail('');
      setPassword('');
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
              // backgroundImage: "url(https://source.unsplash.com/random)",
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
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
