import React, { useState } from 'react';
import { Button, TextField, Typography, Stack } from '@mui/material';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login with:', { username, password });
  };

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username or Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Stack>
  );
}
