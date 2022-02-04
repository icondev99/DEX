pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  constructor() ERC20("USD Coin","USDC") {
      _mint(msg.sender,1000*10**18);
  }
}
