import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.set('name', name);
  //   formData.set('email', email);
  //   formData.set('password', password);
  //    const dat={
  //   name:name,
  //   email:email,
  //   password:password
  //  }
  //   // dispatch(registration({formData,toast}))  check this
  //   fetch("http://localhost:8080/api/user/register",{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },body:JSON.stringify(dat),
  //     credentials:'include'
  //   }).then(res=> {
  //     if(!res.ok){
  //       console.log("Problem");
  //       return
  //     }
  //     return res.json();
  //   }).then(data=>{console.log('Success');
  //     alert("Verify Email");
  //     navigate("/");
  //   });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    try {
      const res = await register(payload); // ✅ uses your axios-based function

      alert("✅ Registered successfully. Please verify your email.");
      navigate("/");

    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed";
      alert("❌ " + msg);
      console.error("Register error:", msg);
    }
  };



  const handleKeepMeLoggedIn = () => {

  }
  return (
    <>
      <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <NoAccountsIcon />
        </Avatar>
        <Typography component='div' variant='h5'>Registration</Typography>

        <Box component='form' onSubmit={handleSubmit}>
          <TextField type='text'
            id='name'
            label='Name'
            name='name'
            margin='normal'
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e => setName(e.target.value))}
          />
          <TextField type='email'
            id='email'
            label='Email'
            name='email'
            margin='normal'
            required
            fullWidth
            autoComplete='email'
            value={email}
            onChange={(e => setEmail(e.target.value))}
          />
          <TextField type='password'
            id='password'
            label='Password'
            name='password'
            margin='normal'
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e => setPassword(e.target.value))}
          />
          <Button type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >Register</Button>

          <Grid container style={{}}>
            <Grid item xs>
              <FormGroup>
                <FormControlLabel control={<Checkbox />}
                  label='Keep me logged in.'
                  checked={checked}
                  onChange={handleKeepMeLoggedIn}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Registration