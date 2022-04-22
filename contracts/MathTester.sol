// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Math.sol";

contract MathTester {
    function testFracExpNeg(
        uint256 k,
        uint256 q,
        uint256 n,
        uint256 p
    ) external pure returns (uint256) {
        return Math.fracExpNeg(k, q, n, p);
    }
}
