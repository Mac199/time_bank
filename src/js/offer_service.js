$(document).ready(function(){


  $(document).on('click', '.offer_service', function(){

      var user = $(this).parent().attr('class');
      console.log(user);

              
      
      App.contracts.TimeBank.deployed().then(function(instance){
        instance.setHelp(true,user);
    })
  });
})