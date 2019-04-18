/* ACM Website Main JS */

function initializeSite(){
	
	/* Load Header and Footer Partials */
	$(".acm-navbar").load("./partials/header.html");
	$(".acm-footer").load("./partials/footer.html");

	/* Update Footer Year */
  $(".curr-date").html(new Date().getFullYear());

}

 $('.landing-scroll-down').on( "click", function(){
      var y = $(window).scrollTop();
      $('html, body').animate({ scrollTop: $(".header").outerHeight() }, 1000);
   }); 

  $('.acm-navbar').on("click", ".burger", function(){
      $( ".site-container" ).toggleClass( "menu-toggle" );
      $( ".acm-navbar .burger i" ).toggleClass( "fa-bars" );
      $( ".acm-navbar .burger i" ).toggleClass( "fa-times" );
   }); 

  $( window ).resize(function() {
    $( ".site-container" ).removeClass( "menu-toggle" )
     $( ".acm-navbar .burger i" ).addClass( "fa-bars" );
      $( ".acm-navbar .burger i" ).removeClass( "fa-times" );
  });

initializeSite();