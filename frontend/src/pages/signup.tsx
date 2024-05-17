import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useStateContext } from "../contexts/ContextProvider";

import backgroundImage from "../assets/background.jpg";
import api from "../api";

const SignUp: React.FC = () =>{
  const navigate = useNavigate();

  const { updateAuthStatus } = useStateContext();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const data = new FormData();
      console.log({
        firstName: data.get("fname"),
        lastName: data.get("lname"),
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
      });

      data.append("first_name", fname);
      data.append("last_name", lname);
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);

      const res = await api.post("/api/user/register/", data);

      if (res.status === 201) {
        alert("User registered successfully");
        updateAuthStatus(true);
        navigate("/login");
      }
    } catch (error) {
      alert(error)
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Grid container spacing={50}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundImage: `url(${backgroundImage})`,  
              backgroundSize: "cover",
              backgroundPosition: "left",
              height: "100vh",
              width: "100vh",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}> 
                <Grid item xs={6}> 
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    autoComplete="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}> 
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    autoComplete="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUp;