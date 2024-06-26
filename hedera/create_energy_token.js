const { TokenCreateTransaction, Client } = require("@hashgraph/sdk");

async function createEnergyToken() {
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    const transaction = new TokenCreateTransaction()
        .setTokenName("GreenCoin")
        .setTokenSymbol("GC")
        .setTokenType(TokenType.FUNGIBLE_COMMON)
        .setTreasuryAccountId(process.env.MY_ACCOUNT_ID)
        .setInitialSupply(1000000);

    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);

    return receipt.tokenId;
}

module.exports = createEnergyToken;