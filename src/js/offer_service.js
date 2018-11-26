$(document).ready(function(){


  $(document).on('click', '.offer_service', function(){

      var user = $(this).parent().attr('class');
      var time_bank;
      App.contracts.TimeBank.deployed().then(function(instance){
        time_bank = instance;
        instance.setHelpProvider(true,user,$('#current_user').html());
    })
  });
})