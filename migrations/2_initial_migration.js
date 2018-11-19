var TimeBankToken = artifacts.require("./TimeBankToken.sol");
var userService = artifacts.require("./userService.sol");
var tokenSale = artifacts.require("./tokenSale");
module.exports = function(deployer) {
  deployer.deploy(TimeBankToken, 1000).then(function(){
    return deployer.deploy(TimeBankToken)
  });

};

module.exports = function(deployer) {
  deployer.deploy(userService);
};