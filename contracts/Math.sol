// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library Math {
    /**
     * Computes k * (1 - 1/q) ^ N using p terms from the binomial expansion
     * keep p<=8, <=6 if N or q are in the order of 10⁸
     */
    function fracExpNeg(
        uint256 k,
        uint256 q,
        uint256 n,
        uint256 p
    ) internal pure returns (uint256) {
        uint256 s = 0;
        uint256 N = 1;
        uint256 B = 1;
        for (uint256 i = 0; i < p; i++) {
            uint256 bterm = (k * N) / B / (q**i);
            if (i % 2 == 0) s += bterm;
            else s -= bterm;
            N = N * (n - i);
            B = B * (i + 1);
        }
        return s;
    }
}
