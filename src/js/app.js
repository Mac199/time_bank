App = {
  web3Provider: null,
  web3_current_provider: null,
  contracts: {},
  account: '0X0',
  current_account: "",
  accounts: [],
  unique_accounts: [],

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
       
       var current_user = $("#current_user").html();

       //set initialization hour deposit
       instance.getHourInitialized(current_user).then(function(result){
          if(result == false){
             instance.setHourDeposit(current_user).then(function(result){

             })
             .then(function(){
               instance.setHourInitialized(current_user).then(function(result){
                })            
             })
             .then(function(){
                  instance.getHourDeposit(current_user).then(function(result){
                  $("#hour_deposit").html(result['c'][0]);
                })    
             })
          }
          else {
           instance.getHourDeposit(App.current_account).then(function(result){
           $("#hour_deposit").html(result['c'][0]);
       })
          }

       })

       //check if current user has a service request
       instance.getServiceReques(current_user).then(function(result){
          if(result == true) {
            $("#service_alert").css("display","block");
          }
       })

       return instance.getFunderAccots();
    }).then(function(result){
      App.accounts = result;

      //remove the duplicated accounts in javascript, record keeps in solidity
      $.each(App.accounts, function(i,el){
        if( $.inArray(el, App.unique_accounts) === -1){
          App.unique_accounts.push(el);
        }
      })


    function append_service(address, i){
      service_instance.getServices(address).then(function(result){
        if(result !== '') {
            $(".account"+i).append("<div class = 'services'>"+result+"</div>");
        }
        return address
      })
      .then(function(result){
        service_instance.getHoursNeeded(result).then(function(hours){
          $(".account"+i).append("<div class='hours clearfix'>"+hours+"</div>"+'<span>hours</span>'+"<button class='request_service' type = 'button' id = 'service'>give help</button>");
        })
      })
    };

    function delete_repeating_account (i){
      service_instance.deleteRepeatingAccount(i);
    }
    
    function check_service_exit(address, i) {
      service_instance.getServices(address).then(function(result){
        if( result !== '' && App.accounts[i] != App.current_account ){
          $("#user_list").append("<div class='account"+i+"'>"+ "<div class = account>"+App.accounts[i]+"</div>"+"</div>");
          append_service(App.accounts[i],i);
        }
      })
    };



    for(var i = 0; i<App.accounts.length; i++){
      check_service_exit(App.accounts[i], i);
    };

  })
  }, //end of render()

  offer_services: function() {
    App.contracts.TimeBank.deployed().then(function(instance) {
       instance.addServices($("#current_user").html(), $("#services").val(), $("#hours_needed").val());

       return instance;
    })
  },

  agree: function() {

    App.contracts.TimeBank.deployed()


      
      .then(function(instance){
        instance.requestServices(App.current_account, false).then(function(){
          $("#service_alert").hide();
        })
       
      .then(function(){

          return instance.getHoursNeeded(App.current_account);

        })
      
      .then(function(result){
          console.log(result['c'][0]);
           return instance.changeHourBalance(App.current_account, result['c'][0], $("#hour_deposit").html());

        })

      .then(function(result){
          $("#hour_deposit").html(result['c'][0]);
          instance.clearServices(App.current_account, '', 0);
        })

    })
  },

} // end of app object



$(function() {
  $(window).load(function() {
    App.init();
})
});
