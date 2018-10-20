$(document).ready(function(){
  $(document).on('click', '.request_service', function(){

      var user_service_requested = $(this).parent().attr('class');
      user_service_requested = $("."+user_service_requested+" .account").text();

      App.contracts.TimeBank.deployed().then(function(instance){
        instance.requestServices(user_service_requested, true);
        console.log(user_service_requested);
    })
  });
})