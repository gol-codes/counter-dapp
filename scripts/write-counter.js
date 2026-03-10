// scripts/write-counter.js
// Run with:  node scripts/write-counter.js
 
const { Web3 } = require("web3");
require("dotenv").config();
const { COUNTER_ABI } = require("./abi");
 
const RPC_URL  = process.env.SEPOLIA_RPC_URL;
const PRIV_KEY = process.env.PRIVATE_KEY;
const CONTRACT = '0xYOUR_COUNTER_ADDRESS';
 
async function main() {
  const web3 = new Web3(RPC_URL);
 
  // Add your account to Web3's wallet so it can sign
  const account = web3.eth.accounts.privateKeyToAccount(PRIV_KEY);
  web3.eth.accounts.wallet.add(account);
  const FROM = account.address;
 
  const counter = new web3.eth.Contract(COUNTER_ABI, CONTRACT);
 
  // Read count BEFORE
  const before = await counter.methods.count().call();
  console.log('Count BEFORE:', before.toString());
 
  // Estimate gas — always do this before sending
  const gasEstimate = await counter.methods
    .increment()
    .estimateGas({ from: FROM });
  console.log('Estimated gas:', gasEstimate.toString());
 
  // Send the transaction
  console.log('Sending increment() transaction...');
  const receipt = await counter.methods
    .increment()
    .send({
      from: FROM,
      gas: Math.ceil(Number(gasEstimate) * 1.2), // 20% buffer
    });
 
  console.log('Tx hash:', receipt.transactionHash);
  console.log('Block:  ', receipt.blockNumber.toString());
  console.log('Gas used:', receipt.gasUsed.toString());
 
  // Read count AFTER
  const after = await counter.methods.count().call();
  console.log('Count AFTER:', after.toString());
 
  // Decode the emitted event from the receipt
  const events = receipt.events?.CountIncremented;
  if (events) {
    console.log('Event — by:', events.returnValues.by);
    console.log('Event — newCount:', events.returnValues.newCount.toString());
  }
}
 
main().catch(console.error);

