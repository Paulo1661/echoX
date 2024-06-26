const createAccount = require('./create_account.js');
const createEnergyToken = require('./create_energy_token.js');
const tradeEnergy = require('./trade_energy.js');

require("dotenv").config();

async function main() {
     // Step 1: Simulate energy production (done via Octave script)
 const aliceProduction = 5;  // 5 kWh
 const bobProduction = 3;  // 3 kWh

 // Step 2: Create Hedera accounts
 const aliceAccount = await createAccount();
 const bobAccount = await createAccount();

 console.log(`Alice Account ID: ${aliceAccount.accountId}`);
 console.log(`Bob Account ID: ${bobAccount.accountId}`);

 // Step 3: Create Energy Token
 const energyTokenId = await createEnergyToken();
 console.log(`Energy Token ID: ${energyTokenId}`);

 // Step 4: Alice sells 2 kWh to Bob
 const amount = 2;  // 2 kWh represented as tokens
 await tradeEnergy(bobAccount.accountId, bobAccount.privateKey, aliceAccount.accountId, energyTokenId, amount);
}

main();

// index.js

const express = require('express');
const { Client, AccountId, PrivateKey } = require('@hashgraph/sdk');
const axios = require('axios');

const app = express();
const port = 3000;

// Initialize Hedera SDK client
const client = Client.forTestnet(); // Update with mainnet config for production
client.setOperator(AccountId.fromString('yourOperatorAccountId'), PrivateKey.fromString('yourOperatorPrivateKey'));

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes for each endpoint
app.post('/RegisterUnitsOnBlockchain', async (req, res) => {
  // Handle logic for RegisterUnitsOnBlockchain
  try {
    // logic to interact with Hedera
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register units on blockchain' });
  }
});

app.post('/CreateSellOrder', async (req, res) => {
  // Handle logic for CreateSellOrder
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create sell order' });
  }
});

app.post('/CancelSellOrder', async (req, res) => {
  // Handle logic for CancelSellOrder
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel sell order' });
  }
});

app.post('/ClaimUnitRewards', async (req, res) => {
  // Handle logic for ClaimUnitRewards
  try {
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to claim unit rewards' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


