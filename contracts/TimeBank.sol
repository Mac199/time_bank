pragma solidity ^0.4.24;

/**
 * The TimeBank contract reward each user's servicec with hours
 */
contract TimeBank {

  struct Funder {
    string services;
    bool   serviceRequest;
    uint   hourDeposit;
  }
  
  mapping (address => Funder) public funder;
  address[] public funderAccots;

  function setHourDeposit(address _address) public {
    funder[_address].hourDeposit = 10;
  }
  

  function addServices(address _address, string _services) public {  
    funder[_address].services = _services;
    funderAccots.push(_address);
  }

  function requestServices(address _address, bool _serviceRequest) public {
    funder[_address].serviceRequest = _serviceRequest;
  }
  function getServices(address _address) view public returns(string) {
    return funder[_address].services;
  }
  
  function getServiceReques(address _address) view public returns(bool) {
    return funder[_address].serviceRequest;
  }

  function getFunderAccots() view public returns(address[]){
    return funderAccots;
  }

}


