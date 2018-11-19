pragma solidity ^0.4.24;

import "./TimeBankToken.sol";

/**
 * user can buy tokens from here
 */
contract tokenSale {

  TimeBankToken public tokenContract;
  uint256 public tokensSold;
  event Sell(address _buyer, uint256 amount);
  function tokenSale (TimeBankToken _tokenContract) {
    tokenContract = _tokenContract;
  }  

  function buyTokens(uint256 _numberofTokens) public payable {

    require(tokenContract.balanceOf(this) >= _numberofTokens);
    require(tokenContract.transfer(msg.sender, _numberofTokens));
    tokensSold += _numberofTokens;
    Sell(msg.sender, _numberofTokens);
  }

}


