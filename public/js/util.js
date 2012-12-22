$(document).ready(function(){

    // var current_title = $(document).attr('title');
    // var link_color = '#5d87d6';

    // if (current_title == "Who We Are") {
    //     $('a#are:link').css('color', link_color);
    // } else if (current_title == "What We Do") {
    //     $('a#do:link').css('color', link_color);
    // } else {
    //     $('a#more:link').css('color', link_color);
    // }

    $('form').submit(function(event){

      event.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/learn-more',
        data: $('form').serialize(),
        success: function() {
          $('label#labelName').before('<p style="color: green;">Thank you for your interest.</p>');
          clearForm('form');
        },
        error: function() {
          alert('why error');
        }
      });


    });

    function clearForm(ele) {
      $(ele).find(':input').each(function() {
        if (this.name == 'Submit') {
            return;
        }
        $(this).val('');
        //$(this).css({opacity: 0.5});
        $(this).attr('disabled', 'disabled');
      });
    }

    // function validate() {
    //   $("#myform").validate({
    //     rules: {
    //       username: {
    //         required: true,
    //         minLength: 2,
    //         remote: "users.php"
    //       }
    //     },
    //     messages: {
    //       username: {
    //         required: "Enter your username",
    //         minLength: "At least 2 characters are necessary",
    //         remote: String.format("The name {0} is already in use")
    //       }
    //     }
    //   });
    // }

});