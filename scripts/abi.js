// scripts/abi.js
// Copy the 'abi' array from Counter.json here:
const COUNTER_ABI = [
  {"inputs":[{"name":"_startCount","type":"uint256"},
    {"name":"_stepSize","type":"uint256"}],
   "stateMutability":"nonpayable","type":"constructor"},
  {"anonymous":false,"inputs":[
    {"indexed":true,"name":"by","type":"address"},
    {"indexed":false,"name":"newCount","type":"uint256"}],
   "name":"CountIncremented","type":"event"},
  {"anonymous":false,"inputs":[
    {"indexed":true,"name":"by","type":"address"}],
   "name":"CountReset","type":"event"},
  {"anonymous":false,"inputs":[
    {"indexed":false,"name":"count","type":"uint256"}],
   "name":"Milestone","type":"event"},
  {"inputs":[],"name":"count",
   "outputs":[{"type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner",
   "outputs":[{"type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"stepSize",
   "outputs":[{"type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"increment",
   "outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"name":"_amount","type":"uint256"}],"name":"incrementBy",
   "outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"reset",
   "outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"name":"_newStep","type":"uint256"}],"name":"setStepSize",
   "outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"name":"_target","type":"uint256"}],"name":"hasReachedTarget",
   "outputs":[{"type":"bool"}],"stateMutability":"view","type":"function"}
];
 
module.exports = { COUNTER_ABI };
