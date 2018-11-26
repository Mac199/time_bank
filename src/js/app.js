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
    $.getJSON("TimeBank.json", function(TimeBank) {
      
      // Instantiate a new truffle contract from the artifact
      App.contracts.TimeBank = TruffleContract(TimeBank);
      // Connect provider to interact with contract
      App.contracts.TimeBank.setProvider(App.web3Provider);
      return App.render();
    })
},

  render: function() {
    var time_bank;

    function getServiceHour(i, list){
      App.contracts.TimeBank.deployed().then(function(instance){
        return instance.user(list[i]);
      }).then(function(result){
        if(list[i] !== App.current_account && result[0] != ''){
          $('#user_list').append('<div id =account'+i+'>'+list[i]+'</div>');
          $('#account'+i).addClass(list[i]);
          $('#account'+i).append('<span class="services">'+result[0]+'</span>'+'<span class="hours">'+result[2]['c'][0]+'hours</span>'+
            '<button class = "offer_service" id=user'+i+'>give help</button>');  
        }
      })
    };

    App.contracts.TimeBank.deployed().then(function(instance){
      time_bank = instance;
      return time_bank.user(App.current_account);
    })
    .then(function(result){
      if(result[4]  == false) {
        time_bank.addUser('', 10, 0, App.current_account, true,false, '',false);
        time_bank.initializedEvent({},{
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event){
          App.init_hour();
        })
      }else{
        App.init_hour();
      }
      return time_bank.getUserAccounts(); 
    })
    .then(function(result){

      for(var i = 0; i< result.length; i++){
        getServiceHour(i, result)
      }
      return time_bank.getHelp(App.current_account);
    })
    .then(function(result){
      if(result == true){
        $('#service_alert').show();
        
        return time_bank.user(App.current_account);
      }
      else return '';
    })
    .then(function(result){
      $('#provider').html(result[6]);
    })
  },

  agree: function(){
    var time_bank;
    App.contracts.TimeBank.deployed().then(function(instance){
      time_bank = instance
      return instance.user(App.current_account);
    }).then(function(result){
      hours_needed = result[2].toNumber();
      time_bank.balanceSetCheck(App.current_account, $('#provider').html(), hours_needed, true);
      time_bank.balanceChange({},{
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event){
        App.init_hour();
        $('#service_alert').hide();
      })
    })
  },

  init_hour: function() {
    var time_bank;
    App.contracts.TimeBank.deployed().then(function(instance){
      time_bank = instance;
      return instance.user(App.current_account);
    }).then(function(result){
      $("#hour_deposit").html(result[1].toNumber());
    })
  },


  request_service: function(){
    var time_bank;
    App.contracts.TimeBank.deployed().then(function(instance){
      time_bank = instance;
      return $('#services').val();
    })
    .then(function(services){
      time_bank.setServiceHour(services, App.current_account,$('#hours_needed').val());
    })

  },



} // end of app object



$(function() {
  $(window).load(function() {
    App.init();
})
});
