pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DEX {
    using SafeMath for uint256;
    IERC20 token;

		event Bought(uint256 amount);
		event Sold(uint256 amount);

    constructor(address token_addr) {
        token = IERC20(token_addr);
    }

    function buy() public payable {
        uint256 amountToBuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountToBuy > 0, "You need to send some ICY");
        require(amountToBuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountToBuy);
				emit Bought(amountToBuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the total allowance");
        uint256 dexBalance = address(this).balance;
        require(amount <= dexBalance, "Not enough ICY in the reserve");
        address payable user = payable(msg.sender);
        user.transfer(amount);
        token.transferFrom(msg.sender, address(this), amount);
				emit Sold(amount);
    }

    receive() external payable {}
}
