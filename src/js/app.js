App = {
  web3Provider: null,
  web3_current_provider: null,
  contracts: {},
  account: '0X0',
  current_account: "",
  accounts: [],

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

    setInterval(function(){
      web3.eth.getCoinbase(function(err, account){
        if(App.current_account !== account) {
          App.current_account = account;
          window.location = "localhost";
        }
      });     
    })

    return App.initContract();
    },

  initContract: function() {
    $.getJSON("TimeBank.json", function(timebank) {
      
      // Instantiate a new truffle contract from the artifact
      App.contracts.TimeBank = TruffleContract(timebank);
      // Connect provider to interact with contract
      App.contracts.TimeBank.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: function() {
    App.contracts.TimeBank.deployed().then(function(instance){
       service_instance = instance;
       return instance.getFunderAccots();
    }).then(function(result){
      App.accounts = result;
      var count;
      function append_service(item, i){
          service_instance.funder(item).then(function(result){
            $(".account"+i).after("<div class = 'services'>"+result+"</div>"+"<button class='request_service' onclick='App.request_service()'>request</button>")
          })  
      };
      for(var i = 0; i<App.accounts.length; i++ ){
        if(App.accounts[i] != App.current_account){
          $("#user_list").append("<div class='account"+i+"'>"+App.accounts[i]+"</div>");
          count = App.accounts[i];
          append_service(count, i);
        }
      }
    }).catch(function(err){
      console.log(err);
    })
  },

  offer_services: function() {
    App.contracts.TimeBank.deployed().then(function(instance) {
       return instance.addServices( App.current_account ,$("#services").val() );
    }).then(function(result){
              window.location = "localhost";
            }).catch(function(err){
                console.log(err);
    })
  },

  // request_service: function() {
  //   App.contracts.TimeBank.deployed().then(function(instance){
  //     instance.
  //   })
  // }

} // end of app object


$(function() {
  $(window).load(function() {
    App.init();
  });
});
