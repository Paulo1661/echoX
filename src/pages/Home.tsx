import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField, Typography, Stack } from "@mui/material";
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { AccountId, TokenId } from "@hashgraph/sdk";
import { MirrorNodeAccountTokenBalanceWithInfo, MirrorNodeClient } from "../services/wallets/mirrorNodeClient";
import { appConfig } from "../config";

const UNSELECTED_SERIAL_NUMBER = -1;

export default function Home() {
  const { walletInterface, accountId } = useWalletInterface();
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [availableTokens, setAvailableTokens] = useState<MirrorNodeAccountTokenBalanceWithInfo[]>([]);
  const [selectedTokenId, setSelectedTokenId] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<number>(UNSELECTED_SERIAL_NUMBER);
  const [tokenIdToAssociate, setTokenIdToAssociate] = useState("");

  useEffect(() => {
    if (accountId === null) {
      return;
    }
    const mirrorNodeClient = new MirrorNodeClient(appConfig.networks.testnet);
    mirrorNodeClient.getAccountTokenBalancesWithTokenInfo(AccountId.fromString(accountId)).then((tokens) => {
      setAvailableTokens(tokens);
      console.log(tokens);
    }).catch((error) => {
      console.error(error);
    });
  }, [accountId]);

  const tokensWithNonZeroBalance = availableTokens.filter((token) => token.balance > 0);
  const selectedTokenBalanceWithInfo = availableTokens.find((token) => token.token_id === selectedTokenId);

  useEffect(() => {
    setAmount(0);
    setSerialNumber(UNSELECTED_SERIAL_NUMBER);
  }, [selectedTokenId]);

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h4" color="white">
        Let's buidl a dApp on Hedera
      </Typography>
      {walletInterface !== null && (
        <>
          <Stack direction='row' gap={2} alignItems='center'>
            <Typography>Transfer</Typography>
            <TextField
              label='Available Tokens'
              value={selectedTokenId}
              select
              onChange={(e) => setSelectedTokenId(e.target.value)}
              sx={{ width: '250px', height: '50px' }}
            >
              <MenuItem value={''}>Select a token</MenuItem>
              {tokensWithNonZeroBalance.map((token) => {
                const tokenBalanceAdjustedForDecimals = token.balance / Math.pow(10, Number.parseInt(token.info.decimals));
                return (
                  <MenuItem key={token.token_id} value={token.token_id}>
                    {token.info.name}({token.token_id}): ({tokenBalanceAdjustedForDecimals})
                  </MenuItem>
                );
              })}
            </TextField>
            {selectedTokenBalanceWithInfo?.info?.type === "NON_FUNGIBLE_UNIQUE" && (
              <TextField
                label='Serial Number'
                select
                value={serialNumber.toString()}
                onChange={(e) => setSerialNumber(Number.parseInt(e.target.value))}
                sx={{ width: '190px', height: '50px' }}
              >
                <MenuItem value={UNSELECTED_SERIAL_NUMBER}>Select a Serial Number</MenuItem>
                {selectedTokenBalanceWithInfo.nftSerialNumbers?.map((serialNumber) => (
                  <MenuItem key={serialNumber} value={serialNumber}>{serialNumber}</MenuItem>
                ))}
              </TextField>
            )}
            {selectedTokenBalanceWithInfo?.info?.type === "FUNGIBLE_COMMON" && (
              <TextField
                type='number'
                label='Amount'
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                sx={{ maxWidth: '100px' }}
              />
            )}
            <Typography>HTS Token to</Typography>
            <TextField
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              label='account id or evm address'
            />
            <Button
              variant='contained'
              onClick={async () => {
                if (selectedTokenBalanceWithInfo === undefined) {
                  console.log(`Token Id is empty.`)
                  return;
                }

                // check if receiver has associated
                const mirrorNodeClient = new MirrorNodeClient(appConfig.networks.testnet);
                const isAssociated = await mirrorNodeClient.isAssociated(AccountId.fromString(toAccountId), selectedTokenId);
                if (!isAssociated) {
                  console.log(`Receiver is not associated with token id: ${selectedTokenId}`);
                  return;
                }
                if (selectedTokenBalanceWithInfo.info.type === "NON_FUNGIBLE_UNIQUE") {
                  await walletInterface.transferNonFungibleToken(
                    AccountId.fromString(toAccountId),
                    TokenId.fromString(selectedTokenId),
                    serialNumber);
                } else {
                  const amountWithDecimals = amount * Math.pow(10, Number.parseInt(selectedTokenBalanceWithInfo.info.decimals));
                  await walletInterface.transferFungibleToken(
                    AccountId.fromString(toAccountId),
                    TokenId.fromString(selectedTokenId),
                    amountWithDecimals);
                }
              }}
            >
              <SendIcon />
            </Button>
          </Stack>
          <Stack direction='row' gap={2} alignItems='center'>
            <TextField
              value={tokenIdToAssociate}
              label='token id'
              onChange={(e) => setTokenIdToAssociate(e.target.value)}
            />
            <Button
              variant='contained'
              onClick={async () => {
                if (tokenIdToAssociate === "") {
                  console.log(`Token Id is empty.`)
                  return;
                }
                await walletInterface.associateToken(TokenId.fromString(tokenIdToAssociate));
              }}
            >
              Associate Token
            </Button>
          </Stack>
          <Stack direction='row' gap={2} alignItems='center' marginTop={2}>
            <Button
              style={{cursor:'pointer'}}
              variant='contained'
              component={Link}
              to="/buy"
            >
              Go to Buy Table
            </Button>
            <Button
              style={{cursor:'pointer'}}
              variant='contained'
              component={Link}
              to="/sell"
            >
              Go to Sell Table
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}
