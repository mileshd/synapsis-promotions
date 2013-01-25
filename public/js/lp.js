$(document).ready(function(){

  $.backstretch("/images/background.jpg");

  $( "#dialog-confirm" ).dialog({
    resizable: false,
    width:450,
    height:300,
    modal: true,
    dialogClass: 'dialogStyle',
    buttons: {
        "Student":{
              text: "Student",
              click: function() {
                  $.cookie('userType', "student", { expires: 2});
                  $( this ).dialog( "close" );
                  window.location = "/student";
              }
         },
         "Company": {
              text: "Company",
              click: function() {
                  $.cookie('userType', "company", { expires: 2});
                  $( this ).dialog( "close" );
                  window.location = "/company";
              }
         }
     }
  });

  $(".ui-dialog-titlebar").hide();
  $(".ui-dialog-buttonpane button:first").css("margin-right", "50px");

});