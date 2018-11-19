pragma solidity ^0.4.24;

import "./TimeBankToken.sol";

/**
 * The TimeBank contract does this and that...
 */
contract userService {
  bool public initialized;
  string public service;
  uint8 public tokensNeeded;

  mapping (address => userService) userProfile;
     
  function userService() public {
    initialized = false;
    service = '';
    tokensNeeded = 0;
  } 
  
  function setInitialization(bool _initialized) public {
    initialized = _initialized;
  }

  function setService(string _service) public {
    service = _service;
  }  

}
