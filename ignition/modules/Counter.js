const { buildModule } = require(
  '@nomicfoundation/hardhat-ignition/modules'
);
 
module.exports = buildModule('CounterModule', (m) => {
  // Deploy Counter(startCount=0, stepSize=1)
  const counter = m.contract('Counter', [0, 1]);
  return { counter };
});
