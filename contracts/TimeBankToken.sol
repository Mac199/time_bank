 pragma solidity ^0.4.24;

/**
 * The TimeBank contract reward each user's servicec with hours
 */
contract TimeBankToken {
  uint256 public totalSupply;
  string public name = 'TimeBankToken';
  string public symbol = 'TimeBank';
  string public standard = 'Time Bank Token v1.0';

  mapping (address => uint256) public balanceOf;
  
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  function TimeBankToken(uint256 _initialSupply) public{
    balanceOf[msg.sender] = _initialSupply;
    totalSupply =_initialSupply;
  }

  function transfer(address _to, uint256 _value) public returns(bool success){
    require (balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    Transfer(msg.sender, _to, _value);
    return true;
  }
}


