/* ACM Website Main JS */

const scrollTime = 1000;

function initializeSite(){
	
	/* Load Header and Footer Partials */
	$(".acm-navbar").load("./partials/header.html");
	$(".acm-footer").load("./partials/footer.html");

	/* Update Footer Year */
  $(".curr-date").html(new Date().getFullYear());

}

 $('.landing-scroll-down').on( "click", function(){
      var y = $(window).scrollTop();
      $('html, body').animate({ scrollTop: $(".header").outerHeight() }, scrollTime);
   }); 

  $('.acm-navbar').on("click", ".burger", function(){
      $( ".site-container" ).toggleClass( "menu-toggle" );
      $( ".acm-navbar .burger i" ).toggleClass( "fa-bars" );
      $( ".acm-navbar .burger i" ).toggleClass( "fa-times" );
   }); 

  $('.acm-footer').on("click", ".footer-event-link", function(e){
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(".header").outerHeight() }, scrollTime);
   }); 

  $('.acm-footer').on("click", ".partners-event-link", function(e){
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(".partners").offset().top }, scrollTime);
   }); 

  $('.acm-navbar').on("click", ".nav-contact", function(e){
      e.preventDefault();
      $('html, body').animate({ scrollTop: $(document).height() }, scrollTime);
   }); 

  $('.acm-footer').on("click", ".footer-scrollup", function(e){
      $('html, body').animate({ scrollTop: 0 }, scrollTime);
   }); 

  $( window ).resize(function() {
    $( ".site-container" ).removeClass( "menu-toggle" )
     $( ".acm-navbar .burger i" ).addClass( "fa-bars" );
      $( ".acm-navbar .burger i" ).removeClass( "fa-times" );
  });

initializeSite();