/* ACM Website Main JS */

function initializeSite(){
	
	/* Load Header and Footer Partials */
	$(".acm-navbar").load("./partials/header.html");
	$(".acm-footer").load("./partials/footer.html");

	/* Update Footer Year */
    $(".curr-date").html(new Date().getFullYear());

}

 $('.landing-scroll-down').click(function(){
      var y = $(window).scrollTop();
      $('html, body').animate({ scrollTop: $(".header").outerHeight() }, 1000);
   }); 

  $('.acm-navbar .burger').click(function(){
      $( ".site-container" ).toggleClass( "menu-toggle" );
   }); 

  $( window ).resize(function() {
    $( ".site-container" ).removeClass( "menu-toggle" )
  });

initializeSite();