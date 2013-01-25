$(document).ready(function(){

  var user = {};

  $('fieldset#2').css('display', 'none');
  $('fieldset#3').css('display', 'none');


  //Collect values from first form, and display 2nd form
  $('#next').click(function(){

      if($('#error')) {
          $('#error').remove();
      }

      user.name = $('#name').val();
      user.email = $('#email').val();
      user.year = $('select.class-year').val();
      user.mail = $('#mail').val();
      user.region = $('select.region').val();
      user.phone = $('#phone-number').val();

      var error = validateUser(user);

      if (error) {
          errorMsg(error, 'fieldset#1');
          return false;
      }

      $('fieldset#1').fadeOut('slow', function() {
          $('fieldset#2').fadeIn('slow');
      });
  });


  //Hide 2nd form, show first form
  $('#back').click(function(){
      $('fieldset#2').fadeOut('slow', function() {
          $('fieldset#1').fadeIn('slow');
      });
  });


  //Collect and validate values. Send them to the server via ajax request.
  $('#submit').click(function(event){

    if($('#error')) {
        $('#error').remove();
    }
   
    event.preventDefault();

    user.car_accessible = $('select.car-accessible').val();
    user.commuter = $('select.commuter').val();
    user.car_location = $('#car-location').val();
    user.car_make = $('#car-make').val();
    user.car_model = $('#car-model').val();
    user.car_year = $('#car-year').val();
    user.weekly_miles = $('#miles-driven').val();

    var error = validateCar(user);

    if (error) {
        errorMsg(error, 'fieldset#2');
        return false;
    }
 
  $.ajax({
    type: 'POST',
    url: '/',
    data: user,
    success: function() {
      $('fieldset#2').fadeOut('slow', function() {
            $('fieldset#3').fadeIn('slow').css('margin-top', '65px');
        });
    },
    error: function() {
      errorMsg("An error occured. Please try again later.", 'fieldset#2');
    }
    });

  });



  $('#facebook').click(function(eve){
          eve.preventDefault();
          open_in_new_tab("http://www.facebook.com/SynapsisBusinessNetworking");
      });
      
      
  function open_in_new_tab(url) {
      window.open(url, '_blank');
      window.focus();
  }

  //Validate 1st form
  function validateUser(user) {
      var message = "";
      var err = false;

      if (user.name == '') {
          message += "Please enter your full name.<br />";
          err = true;
      }

      if  (!validateEmail(user.email)) {
          message += "Please enter a valid email address.<br />";
          err = true;
      }

      if (user.mail == '') {
          message += "Please enter your mailing address.<br />";
          err = true;
      }

      if  (!validatePhone(user.phone)) {
          message += "Please enter a valid phone number.<br />";
          err = true;
      }

      if (err == true) {
          return message;
      }
      else {
          return false;
      }
  }
  //Validate 2nd form
  function validateCar(user) {
      var message = "";
      var err = false;

      if (user.car_location == '') {
          message += "Please enter your car's location. (ex. Lot 2)<br />";
          err = true;
      }

      if  (isNaN(user.weekly_miles) || user.weekly_miles < 0 || user.weekly_miles > 1000 || user.weekly_miles == '') {
          message += "Please enter a valid number of miles driven.<br />";
          err = true;
      }

      if (err == true) {
          return message;
      }
      else {
          return false;
      }
  }

  function validateEmail(email) { 
      var re = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
      return re.test(email);
  }

  function validatePhone(phone) { 
      var re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
      return re.test(phone);
  }

  function errorMsg(error, container, pixel) {
      $(container).prepend('<div id="error" style="border: 1px solid black; width: 340px; margin-bottom: 10px; padding: 5px; background-color: #FFDFDF;">' + error + '</div>');
  }

// function clearForm(ele) {
//   $(ele).find(':input').each(function() {
//     if (this.name == 'Submit') {
//         return;
//     }
//     $(this).val('');
//     //$(this).css({opacity: 0.5});
//     $(this).attr('disabled', 'disabled');
//   });
// }


});