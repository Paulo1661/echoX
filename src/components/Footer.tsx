import { Box, Button, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import BuiltOnHedera from "../assets/built-on-hedera.svg";

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box className='footer'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='space-between' mt={4}>
          <img 
            src={BuiltOnHedera}
            alt='An upper case H with a line through the top and the text Build on Hedera'
            className='builtOnHederaSVG'
          />
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" component={Link} to="/login">
            Login
          </Button>
          <Button variant="outlined" component={Link} to="/register">
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
