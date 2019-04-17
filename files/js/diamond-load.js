
/* Diamond Load */
  
  $(".preloader").css("display", "block");

  var canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var context = canvas.getContext('2d');

  //Line

  var percent = 0;
  var i = 0;
  var range = 15;
  var diamond_colorstat = "#aaa";
  var radius = 80;

  function ResizeCanvas(){
    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function DrawDiamond(){

    context.clearRect(0,0, innerWidth, innerHeight);

    
    var linewidth = 12;

    var xpoint = [window.innerWidth/2-radius, window.innerWidth/2, window.innerWidth/2+radius, window.innerWidth/2];
    var ypoint = [window.innerHeight/2, window.innerHeight/2-radius, window.innerHeight/2, window.innerHeight/2+radius];


    //BG Diamond

    context.beginPath();
    context.moveTo(xpoint[0], ypoint[0]);

    var j = 0;

    while (j <= 4){
      j+=1;
      context.lineTo(xpoint[j%4],ypoint[j%4]);
    }
    
    
    context.lineWidth = linewidth;
    context.strokeStyle = diamond_colorstat;
    
    context.stroke();

    //Main Animation
    context.beginPath();
    context.moveTo(xpoint[i%4], ypoint[i%4]);

    var percent1 = ((range-percent)/range) * xpoint[i%4];
    percent1 =  percent1 + (percent/range)*xpoint[(i+1)%4];
    var percent2 = ((range-percent)/range) * ypoint[i%4];
    percent2 = percent2 + (percent/range)*ypoint[(i+1)%4];

    context.lineTo(percent1,percent2);  
    
    context.lineWidth = linewidth;
    context.strokeStyle = "#0083c0"
    
    context.stroke();


  }
  

  function animateDiamond(){
    DrawDiamond();
  

    percent = percent+1;
    if (percent%range == 0){
      i = (i+1)%4;
      percent = 0;
    }

    context.font = "16px Montserrat";
    context.textAlign = "center";

    context.fillText("LOADING...", window.innerWidth/2, window.innerHeight/2 +8);


    requestAnimationFrame(animateDiamond);


  }

  animateDiamond();


  $(window).on("load", function() {
    diamond_colorstat = "#0083c0";
    $(".preloader").fadeOut();

    /* 10 second max loading screen time */
    setTimeout(function() {
      $(".preloader").remove();
    }, 10000);

  });