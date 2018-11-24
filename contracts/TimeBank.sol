 pragma solidity ^0.4.24;

/**
 * 
 */
contract TimeBank{
  struct User {
    string service;
    uint8 deposit;
    uint8 hoursNeeded;
    address account;
    bool initialized;
    bool help;
  }
  event initializedEvent (
    bool indexed _initialized
    );
  mapping (address => User) public user;
  address[] public userAccounts;
  
  function addUser(string _service, uint8 _deposit, uint8 _hoursNeeded, address _account, bool _initialized, bool _help) public {
    user[_account] = User(_service, _deposit, _hoursNeeded, _account, _initialized, _help);
    emit initializedEvent(_initialized);
    userAccounts.push(_account);
  }
  function setServiceHour(string _service, address _account, uint8 _hoursNeeded) public {
    user[_account].service = _service;
    user[_account].hoursNeeded = _hoursNeeded;
  }
  function setHelp(bool _help, address _account) public {
    user[_account].help = _help;
   }
   function getHelp(address _account) public view returns(bool){
    return user[_account].help;
   }
  function getUserAccounts() public view returns(address[]) {
    return userAccounts;
  }

}


