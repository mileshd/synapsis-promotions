$(document).ready(function(){

    var user = {};

    $('fieldset#2').css('display', 'none');
    $('fieldset#3').css('display', 'none');

    $('#next').click(function(){

        user.name = $('#name').val();
        user.email = $('#email').val();
        user.mail = $('#mail').val();
        user.region = $('#region').val();
        user.phone = $('#phone-number').val();

        // var error = validate(user);

        // if (error) {
        //     alert("error");
        //     alert(error);
        //     return false;
        // }

            $('fieldset#1').fadeOut('slow', function() {
                $('fieldset#2').fadeIn('slow');
            });
    });

    $('#submit').click(function(event){
     
      event.preventDefault();

        user.accessible = $('#name').val();
        user.make = $('#email').val();
        user.model = $('#mail').val();
        user.year = $('#region').val();
     
      $.ajax({
        type: 'POST',
        url: '/',
        data: user,
        success: function() {
          $('fieldset#2').fadeOut('slow', function() {
                $('fieldset#3').fadeIn('slow');
            });
        },
        error: function() {
          alert('why error');
        }
        });

    });

    function validate(user) {
        var message = "";
        var err = false;

        if (user.name == '') {
            message += "Please enter your full name.</br>";
            err = true;
        }

        if  (!validateEmail(user.email)) {
            message += "Please enter a valid email address.</br>";
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