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
    address provider;
    bool check;
  }
  event initializedEvent (
    bool indexed _initialized
    );
  event balanceChange (
    uint8 indexed deposit
    );
  mapping (address => User) public user;
  address[] public userAccounts;
  
  function addUser(string _service, uint8 _deposit, uint8 _hoursNeeded, address _account, bool _initialized, bool _help, address _provider, bool _check) public {
    user[_account] = User(_service, _deposit, _hoursNeeded, _account, _initialized, _help, _provider, _check);
    emit initializedEvent(_initialized);
    userAccounts.push(_account);
  }
  function setServiceHour(string _service, address _account, uint8 _hoursNeeded) public {
    user[_account].service = _service;
    user[_account].hoursNeeded = _hoursNeeded;
  }
  function setHelpProvider(bool _help, address _account, address _provider) public {
    user[_account].help = _help;
    user[_account].provider = _provider;
   }
   function getHelp(address _account) public view returns(bool){
    return user[_account].help;
   }
  function getUserAccounts() public view returns(address[]) {
    return userAccounts;
  }
  function balanceSetCheck(address _account, address _provider, uint8 _hoursNeeded, bool _check) public {
    require (user[_account].deposit  > 0);
    user[_account].deposit = user[_account].deposit - _hoursNeeded;
    user[_provider].deposit = user[_provider].deposit + _hoursNeeded;
    user[_account].check = _check;
    emit balanceChange(user[_account].deposit);
    setServiceHour('',_account,0);
  }



}


