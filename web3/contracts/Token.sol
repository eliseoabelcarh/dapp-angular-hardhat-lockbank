// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{

    address private bankContract;

    modifier onlyBank() {
        require(msg.sender == bankContract, "Only the bank can mint new tokens");
        _;
    }
        
    constructor(address _bankAddress) ERC20("Yield Token", "FREE"){
        bankContract = _bankAddress;
    }

    function mint(address _to, uint256 _amount) public onlyBank {
        _mint(_to, _amount);
    }
}