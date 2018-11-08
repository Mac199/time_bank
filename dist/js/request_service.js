$(document).ready(function(){


  $(document).on('click', '.request_service', function(){

      var user_service_requested = $(this).parent().attr('class');
      var hours = $("."+user_service_requested+" .hours").text();  
      user_service_requested = $("."+user_service_requested+" .account").text();
              
      
      App.contracts.TimeBank.deployed().then(function(instance){
        instance.requestServices(user_service_requested, true);
        return instance;
    })
      .then(function(instance){
        console.log(hours);
        console.log( $("#current_user").text() );
        return instance.increaseHourBalance( $("#current_user").text(), hours);

    }).then(function(result){
      console.log(result);
    })
  });
})