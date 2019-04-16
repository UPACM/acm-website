 
  var script_url = "https://script.google.com/macros/s/AKfycbz1b4YCWoYMxOol0cIuX_X0DOd0YS3zZTkzTg_q_b2Ik3nKZvY/exec";

  var loadingdone = 0;
  var acctoken = "";

  InitWebsite();

  function InitWebsite(){

    var action_url = script_url+"?action=read";

    var select = "main";

    var EventsOn = false;
    var HeaderMode = "Video";

    /* Main Sheet */
    $.getJSON(action_url+"&purpose="+select, function (json) {

    // Set the variables from the results array
         
        // USE JSON DATA
        for (var i = 0; i < json.records.length; i++) {
          if (json.records[i].Configuration == "Title"){
            $(".landing-title").html(json.records[i].Setting);
          }
          else if (json.records[i].Configuration == "Subtitle"){
            $(".landing-subtitle").html(json.records[i].Setting);
          }
          else if (json.records[i].Configuration == "Show About Us in Header"){
            if (json.records[i].Setting == false){
              $(".nav-about").remove();
            }
          }
          else if (json.records[i].Configuration == "Show Committees in Header"){
            if (json.records[i].Setting == false){
              $(".nav-committees").remove();
            }
          }
          else if (json.records[i].Configuration == "Show Contact in Header"){
            if (json.records[i].Setting == false){
              $(".nav-contact").remove();
            }
          }
          else if (json.records[i].Configuration == "Landing Image/Video"){
            HeaderMode = json.records[i].Setting;
          }
          else if (json.records[i].Configuration == "Landing Image URL"){
            if (HeaderMode == "Image"){
              $(".header .landing-image").css("background-image", "url ( " + json.records[i].Setting + ");" );
              $("#acm-header").remove();
            }
          }
          else if (json.records[i].Configuration == "Landing Video URL"){
            if (HeaderMode == "Video"){
              $(".landing-image").remove();
              $("video#acm-header source").each(function() {
                var sourceFile =  json.records[i].Setting;
                $(this).attr("src", sourceFile);
                var video = this.parentElement;
                video.load();
                video.play();
              });
            }
          }
          else if (json.records[i].Configuration == "Landing Blue Overlay"){
             if (json.records[i].Setting == false){
              $(".header .blueoverlay").remove();
            }
          }
          else if (json.records[i].Configuration == "Show Events"){
            if (json.records[i].Setting == false){
              $(".events").remove();
              EventsOn = false;
            }
            else{
              EventsOn = true;
            }
            
          }
          else if (json.records[i].Configuration == "Events Description"){
            $(".events-description").html(json.records[i].Setting);
          }
          else if (json.records[i].Configuration == "Show Facebook"){
            if (json.records[i].Setting == false){
              $(".soc-fb").remove();
            }
          }
           else if (json.records[i].Configuration == "Show Twitter"){
            if (json.records[i].Setting == false){
              $(".soc-twitter").remove();
            }
          }
          else if (json.records[i].Configuration == "Contact Us E-mail"){
            $(".footer-mail").html(json.records[i].Setting);
          }
          else if (json.records[i].Configuration == "Contact Us Mobile"){
            $(".footer-mobile").html(json.records[i].Setting);
          }
          else if (json.records[i].Configuration == "Contact Us Address"){
            $(".footer-address").html(json.records[i].Setting);
          }
           else if (json.records[i].Configuration == "Facebook Access Token"){
            acctoken = json.records[i].Setting;
          }
          
        }
    
        /* Events Sheet */

        if (EventsOn){
          select = "events";
          $.getJSON(action_url+"&purpose="+select, function (json2) {

              for (var i = 0; i < json.records.length; i++) {
                  /*alert(json2.records[i].Name+ json2.records[i].Description);*/
              }
                
            
          });
        }



        /* FB Data */

        FB.api('/upacm', 'GET',
          {
            "fields":"posts{message,full_picture,permalink_url}",
            "access_token": acctoken
          },
          function(response) {
              acctoken = response;
              FBDataCallback(acctoken);
              $(".fb-script-sm").remove();
          }
        );
        
    });
   
  }


  function FBDataCallback(callback){
    //console.log(callback.posts);
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var message = ""
    var tempmsg = "";
    var imagepic = "";
    var link = "";
    for (var i = 0; i < 4; i++){
      tempmsg = callback.posts.data[String(i)].message.replace(/\n/g, '<br>');
      tempmsg = tempmsg.replace(urlRegex, function(url) { return '<a href="' + url + '">' + url + '</a>';});
      link = callback.posts.data[String(i)].permalink_url;
      imagepic = '<img src="' + callback.posts.data[String(i)].full_picture + '" class="img-fluid">';
      message = message +  `<hr>
      <div class='row'>
        <div class='col-lg-4'>
          <a href='` + link + `"'>
            `+ imagepic +`
          </a>
        </div>
        <div class='col-lg-8 d-flex'>
          <p class='my-auto'>
            ` + tempmsg.slice(0,500) + `
          </p>
        </div>
      </div>`;

    }
    $(".soc-fb").html(message);
  }
