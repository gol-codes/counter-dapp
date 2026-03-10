// scripts/read-counter.js
// Run with:  node scripts/read-counter.js
 
const { Web3 } = require("web3");
require("dotenv").config();
const { COUNTER_ABI } = require("./abi");
 
// ── Configuration ─────────────────────────────────────────────
const RPC_URL    = process.env.SEPOLIA_RPC_URL;
const CONTRACT   = '0xYOUR_COUNTER_ADDRESS'; // paste your address
 
async function main() {
  // Connect Web3.js to Sepolia via the RPC URL
  const web3 = new Web3(RPC_URL);
 
  // Create a contract instance (read-only — no wallet needed)
  const counter = new web3.eth.Contract(COUNTER_ABI, CONTRACT);
 
  // Read state variables — .call() is free, no gas needed
  const count    = await counter.methods.count().call();
  const owner    = await counter.methods.owner().call();
  const stepSize = await counter.methods.stepSize().call();
 
  console.log('=== Counter Contract State ===');
  console.log('Contract address:', CONTRACT);
  console.log('count:   ', count.toString());
  console.log('owner:   ', owner);
  console.log('stepSize:', stepSize.toString());
 
  // Call a view function with a parameter
  const reached = await counter.methods
    .hasReachedTarget(10).call();
  console.log('Has reached 10?', reached);
 
  // Read the contract's ETH balance (should be 0 — no payable fns)
  const bal = await web3.eth.getBalance(CONTRACT);
  console.log('Contract ETH balance:', web3.utils.fromWei(bal,'ether'), 'ETH');
}
 
main().catch(console.error);
