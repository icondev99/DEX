pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DEX_FixedRate {
    using SafeMath for uint256;
    IERC20 token;

    uint256 public priceEthToToken;
    uint256 public priceTokenToEth;

    constructor(address token_addr) {
        token = IERC20(token_addr);
    }

    function init(uint256 tokens) public payable {
        require(msg.value>0, "DEX must be initialized with some Eth.");
        require(tokens>0, "DEX must be initialized with some tokens.");
        require(token.transferFrom(msg.sender, address(this), tokens));
        priceEthToToken = tokens * 10 ** 18 / msg.value;
        priceTokenToEth = msg.value * 10 ** 18 / tokens;
    }

    function ethToToken() public payable returns (uint256) {
        uint256 tokens_bought = msg.value * priceEthToToken / 10**18;
        require(token.transfer(msg.sender, tokens_bought));
        return tokens_bought;
    }

    function tokenToEth(uint256 tokens) public returns (uint256) {
        uint256 eth_bought = tokens * priceTokenToEth / 10**18;
        address payable user = payable(msg.sender);
        user.transfer(eth_bought);
        require(token.transferFrom(msg.sender, address(this), tokens));
        return eth_bought;
    }
}
