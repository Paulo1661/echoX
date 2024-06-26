import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import HBARLogo from "../assets/hbar-logo.svg";
import { useWalletInterface } from '../services/wallets/useWalletInterface';
import { WalletSelectionDialog } from './WalletSelectionDialog';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { accountId, walletInterface } = useWalletInterface();
  const navigate = useNavigate();

  const handleConnect = async () => {
    if (accountId) {
      walletInterface.disconnect();
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (accountId) {
      setOpen(false);
    }
  }, [accountId])

  return (
    <AppBar position='relative'>
      <Toolbar onClick={() => navigate('/')} style={{cursor:'pointer'}}>
        <img src={HBARLogo} alt='An upper case H with a line through the top' className='hbarLogoImg' />
        <Typography variant="h6" color="white" pl={1} noWrap>
          EcoX
        </Typography>
        <Button
          variant='contained'
          sx={{
            ml: "auto"
          }}
          onClick={handleConnect}
        >
          {accountId ? `Connected: ${accountId}` : 'Connect Wallet'}
        </Button>
      </Toolbar>
      <WalletSelectionDialog open={open} setOpen={setOpen} onClose={() => setOpen(false)} />
    </AppBar>
  )
}