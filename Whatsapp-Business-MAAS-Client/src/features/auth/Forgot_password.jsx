import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Forgot_password = () => {
  const [step, setStep] = useState(1); // 1: ask email, 2: ask otp + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword,setConfirm]=useState('');
    const navigate=useNavigate();
  // Step 1: Send email to backend to send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/user/forgot-password', { email:email });
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };
  // Step 2: Verify OTP and reset password
  const handleVerifyOtpAndReset = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/user/verify-forgot-password-otp', { email:email, otp:otp });
      toast.success('OTP verified successfully!');
      setStep(3); // or redirect to login
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };
  const handlereset=async (e)=>{
     e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/user/reset-password', { email:email, newPassword:newPassword,confirmPassword:newPassword });
      toast.success('Password changed successfully!');
      navigate("/"); // or redirect to login
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }

  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Forgot Password
      </Typography>

      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Send OTP
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtpAndReset}>
          <TextField
            fullWidth
            label="OTP"
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
          
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handlereset}>
          <TextField
            fullWidth
            label="New password"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
           <TextField
            fullWidth
            label="Confirm password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Confirm
          </Button>
        </form>
      )}

    </Box>
  );
};

export default Forgot_password;
