// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/escrow/ConditionalEscrowUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CalculatorV1 is Initializable {
    uint public val;

    function initialize(uint256 _val) external initializer {
        val = _val;
    }

    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }

    function getVal() public view returns (uint) {
        return val;
    }
}
