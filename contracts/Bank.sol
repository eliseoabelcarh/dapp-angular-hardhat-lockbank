// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Token.sol";

contract Bank {
    mapping (address => uint256) public accounts;
    constructor() { }

    function deposit() payable external {
        require(msg.value > 0, "You must deposit a positive amount");
        accounts[msg.sender] += msg.value;
    }
    function totalSupply() view  external returns (uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 _amount, address _tokenContract) external {
        require(_amount > 0, "You must withdraw a positive amount");
        require(accounts[msg.sender] >= _amount, "You do not have enough funds to withdraw");
        accounts[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        Token yieldToken = Token(_tokenContract);
        yieldToken.mint(msg.sender, 1 ether);
    }
}