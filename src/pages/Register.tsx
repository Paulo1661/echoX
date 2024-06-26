import React, { useState } from 'react';
import { Button, TextField, Typography, Stack } from '@mui/material';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
    if (password === confirmPassword) {
      console.log('Register with:', { firstName, lastName, email, password });
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h4">Register</Typography>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
    </Stack>
  );
}
