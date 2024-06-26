const { TransferTransaction, Hbar, TokenAssociateTransaction, TokenTransferTransaction, Client } = require("@hashgraph/sdk");

async function tradeEnergy(buyerId, buyerPrivateKey, sellerId, tokenId, amount) {
    const client = Client.forTestnet();
    client.setOperator(buyerId, buyerPrivateKey);

    // Ensure the buyer is associated with the token
    let associateTransaction = new TokenAssociateTransaction()
        .setAccountId(buyerId)
        .setTokenIds([tokenId]);

    await associateTransaction.execute(client);

    // Create a transfer transaction
    const transaction = new TransferTransaction()
        .addTokenTransfer(tokenId,sellerId, -amount)
        .addTokenTransfer(tokenId,buyerId, amount)
        .freezeWith(client);

    //const response = await transaction.execute(client);
    //const receipt = await response.getReceipt(client);

    const transferSign = await transaction.sign(buyerPrivateKey);
    const transferSubmit = await transferSign.execute(client);
    const receipt = await transferSubmit.getReceipt(client);

    //console.log(`Transaction status: ${receipt.status}`);
    console.log(receipt);

}

module.exports = tradeEnergy;