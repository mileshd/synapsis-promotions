$(document).ready(function(){

	init();

	$('#signup').click(function() {
		$('.company-nav').hide();
		$('#sign-up').fadeIn(800);
		return false;
	});

	$('#whatweoffer').click(function() {
		$('.company-nav').hide();
		$('#what-we-offer').fadeIn(800);
		return false;
	});

	$('#aboutus').click(function() {
		$('.company-nav').hide();
		$('#about-us').fadeIn(800);
		return false;
	});

	$('#faqnav').click(function() {
		$('.company-nav').hide();
		$('#faq').fadeIn(800);
		return false;
	});

	function init() {
		$('#what-we-offer').hide();
		$('#about-us').hide();
		$('#faq').hide();
	}

});