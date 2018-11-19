App = {
  web3Provider: null,
  web3_current_provider: null,
  contracts: {},
  account: '0X0',
  current_account: "",
  accounts: [],
  admin: "0x538efe6cc766900a30b7dc23bf060b2538c766b6",

  init: function(){

    App.web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);

    //Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.current_account = account;
        $("#current_user").html(App.current_account);
      }
    });

    return App.initContract();
    },

  initContract: function() {
    $.getJSON("TimeBankToken.json", function(timebanktoken) {
      
      // Instantiate a new truffle contract from the artifact
      App.contracts.TimeBankToken = TruffleContract(timebanktoken);
      // Connect provider to interact with contract
      App.contracts.TimeBankToken.setProvider(App.web3Provider);
      
    }).then(function(){
        $.getJSON("userService.json", function(userService){
          App.contracts.userService = TruffleContract(userService);
          App.contracts.userService.setProvider(App.web3Provider);
          
        }).then(function(){
          $.getJSON("tokenSale.json", function(tokenSale){
            App.contracts.tokenSale = TruffleContract(tokenSale);
            App.contracts.tokenSale.setProvider(App.web3Provider);
            return App.render();
          })
        });      
    });
  },

  render: function() {
    App.contracts.TimeBankToken.deployed().then(function(instance){
      var time_bank_token = instance;
      time_bank_token.balanceOf(App.admin).then(function(i){
        var balance = i.toNumber();
        
        if(App.current_account == App.admin){
          console.log(time_bank_token.address);
          time_bank_token.transfer(time_bank_token.address, 10);
        } 
      })
      return time_bank_token.balanceOf(App.current_account);
    }).then(function(balance_current_account){
      balance_current_account = balance_current_account.toNumber();
      $("#hour_deposit").html(balance_current_account);
    })
  },
  
  transfer_tokens: function() {
    App.contracts.TimeBankToken.deployed().then(function(instance){
      var time_bank_token = instance;

      return time_bank_token.transfer(App.current_account, 5);

      //return App.contracts.userService.deployed();
     })//.then(function(instance){
       //return instance.setInitialization(true);
     //})
     .then(function(result){
       console.log(result);
     })
  }

} // end of app object



$(function() {
  $(window).load(function() {
    App.init();
})
});
