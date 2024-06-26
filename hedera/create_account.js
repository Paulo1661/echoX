const { Client, AccountCreateTransaction, PrivateKey, Hbar } = require("@hashgraph/sdk");

async function createAccount() {
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    const privateKey = PrivateKey.generate();
    const publicKey = privateKey.publicKey;

    const transaction = new AccountCreateTransaction()
        .setKey(publicKey)
        .setInitialBalance(new Hbar(10));

    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);

    return {
        accountId: receipt.accountId,
        privateKey: privateKey
    };
}

module.exports = createAccount;