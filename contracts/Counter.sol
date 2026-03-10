// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
/// @title Counter — simple on-chain counter for the DApp lab
contract Counter {
    uint256 public count;
    address public owner;
    uint256 public stepSize;
 
    event CountIncremented(address indexed by, uint256 newCount);
    event CountReset(address indexed by);
    event StepSizeChanged(uint256 oldStep, uint256 newStep);
    event Milestone(uint256 count);
 
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
 
    constructor(uint256 _startCount, uint256 _stepSize) {
        count = _startCount;
        stepSize = _stepSize;
        owner = msg.sender;
    }
 
    function increment() public {
        count += stepSize;
        emit CountIncremented(msg.sender, count);
        if (count % 10 == 0) {
            emit Milestone(count);
        }
    }
 
    function incrementBy(uint256 _amount) public {
        require(_amount > 0, "Amount must be positive");
        count += _amount;
        emit CountIncremented(msg.sender, count);
    }
 
    function reset() public onlyOwner {
        count = 0;
        emit CountReset(msg.sender);
    }
 
    function setStepSize(uint256 _newStep) public onlyOwner {
        require(_newStep > 0, "Step must be positive");
        emit StepSizeChanged(stepSize, _newStep);
        stepSize = _newStep;
    }
 
    function hasReachedTarget(uint256 _target)
        public view returns (bool)
    {
        return count >= _target;
    }
}
