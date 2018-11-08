 pragma solidity ^0.4.24;

/**
 * The TimeBank contract reward each user's servicec with hours
 */
contract TimeBank {

  struct Funder {
    string services;
    bool   serviceRequest;
    uint   hourDeposit;
    bool   hourinitialiazed;
    uint   hoursNeeded;

  }
  
  mapping (address => Funder) public funder;
  address[] public funderAccots;

  function setHoursNeeded(address _address, uint hoursNeeded) public {
    funder[_address].hoursNeeded = hoursNeeded;
  }

  function getHoursNeeded(address _address) view public returns(uint) {
    return funder[_address].hoursNeeded;
  }

  function setHourDeposit(address _address) public {
    funder[_address].hourDeposit = 10;
  }

  function getHourDeposit(address _address) view public returns(uint){
  return funder[_address].hourDeposit;
  }
  
  function changeHourBalance(address _address, uint hoursNeeded, uint hourDeposit) view public returns(uint){
    funder[_address].hourDeposit = funder[_address].hourDeposit - funder[_address].hoursNeeded;
    return funder[_address].hourDeposit;
  }

  function increaseHourBalance(address _address, uint hoursNeeded) public {
    funder[_address].hourDeposit = funder[_address].hourDeposit + hoursNeeded;
  }
  
  function setHourInitialized(address _address) {
    funder[_address].hourinitialiazed = true;
    funderAccots.push(_address);
  }


  function getHourInitialized (address _address) view public returns(bool){
    return funder[_address].hourinitialiazed;
  }
  

  function addServices(address _address, string _services, uint _hoursNeeded) public {  
    funder[_address].services = _services;
    funder[_address].hoursNeeded = _hoursNeeded;
    
  }

  function clearServices(address _address, string _services, uint _hoursNeeded) public {
    funder[_address].services = _services;
    funder[_address].hoursNeeded = _hoursNeeded;
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

  function deleteRepeatingAccount(uint index) public {
    delete funderAccots[index];
  }

}


