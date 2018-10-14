pragma solidity ^0.4.24;

/**
 * The TimeBank contract reward each user's servicec with hours
 */
contract TimeBank {

  struct Funder {
    string services;
    bool   serviceRequest;
  }
  
  mapping (address => Funder) public funder;
  address[] public funderAccots;

  function addServices(address _address, string _services, bool _serviceRequest) public {
    
    funder[_address].services = _services;
    funder[_address].serviceRequest = _serviceRequest
    funderAccots.push(_address);
  }

  function getFunderAccots() view public returns(address[]){
    return funderAccots;
  }
}


