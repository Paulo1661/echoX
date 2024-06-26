import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const dummyData = [
  { accountId: '0.0.12345', energyQuantity: 100, energyPrice: 50 },
  { accountId: '0.0.67890', energyQuantity: 200, energyPrice: 60 },
  { accountId: '0.0.54321', energyQuantity: 150, energyPrice: 55 },
];

export default function SellTable() {
  const navigate = useNavigate();

  const handleSell = (accountId: string, energyQuantity: number, energyPrice: number) => {
    console.log(`Selling ${energyQuantity} units of energy at price ${energyPrice} to account ${accountId}`);
  };

  return (
    <div>
      <Typography variant="h4" color="white">Sell Table</Typography>
      {/* <Button color="warning" onClick={() => navigate('/')}>Back to Home</Button> */}
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hedera Account ID</TableCell>
              <TableCell>Energy Quantity</TableCell>
              <TableCell>Energy Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.accountId}</TableCell>
                <TableCell>{transaction.energyQuantity}</TableCell>
                <TableCell>{transaction.energyPrice} GC</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSell(transaction.accountId, transaction.energyQuantity, transaction.energyPrice)}
                  >
                    Sell
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
