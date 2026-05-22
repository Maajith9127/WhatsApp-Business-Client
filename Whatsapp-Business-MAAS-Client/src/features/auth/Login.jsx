import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);



  const handleSubmit = async (e) => {
    
    console.log("Submit clicked");
    try {
      await login({ email, password }); // ✅ This updates context & sets tokens
      navigate("/DashBoard");
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed";
      alert(msg);
    }
  };

  

  const handleKeepMeLoggedIn = async (e) => {
    setChecked(!checked);
  }

  return (
    <>
      <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="div" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            margin="normal"
            required
            fullWidth
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            name="password"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container style={{}}>
            <Grid item xs>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Keep me logged in."
                  checked={checked}
                  onChange={handleKeepMeLoggedIn}
                />
                <p onClick={() => { navigate("/forgot-password") }}>Forgot password</p>
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
