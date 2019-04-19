 
  var script_url = "https://script.google.com/macros/s/AKfycbz1b4YCWoYMxOol0cIuX_X0DOd0YS3zZTkzTg_q_b2Ik3nKZvY/exec";

  var loadingdone = 0;
  var acctoken = "";
  const fb_post_limit = 10;

  function loadData(select){

    var action_url = script_url+"?action=read";
    var EventsOn = false;
    var HeaderMode = "Video";
    var SocialOn = false;
    var PartnersOn = false;

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
              if (EventsOn){
                $(".events-description").html(json.records[i].Setting);
              }
          }
          else if (json.records[i].Configuration == "Show Facebook Social News"){
            if (json.records[i].Setting == false){
              $(".social").remove();
              SocialOn = false;
            }
            else{
              SocialOn = true;
            }
          }
          else if (json.records[i].Configuration == "Show Partners"){
            if (json.records[i].Setting == false){
              $(".partners").remove();
              PartnersOn = false;
            }
            else{
              PartnersOn = true;
            }
          }
          else if (json.records[i].Configuration == "Contact Us E-mail"){
            $(".footer-mail").html(json.records[i].Setting);
            $(".footer-mail").attr("href", "mailto:"+json.records[i].Setting);
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

              $(".diamond-grid").fadeOut(1);
              var events_dataHTML = "";
              for (var i = 0; i < json2.records.length; i++) {
                events_dataHTML = events_dataHTML + '<div class = "item"><img src = "' + json2.records[i].Image_URL + '"></div>'
              }                
              $(".events .diamond-grid").html(events_dataHTML);

              $(".diamond-grid").diamonds({
                size:200,
                gap:5,
                hideIncompleteRow:false,
                autoRedraw:true,
                itemSelector:".item"
              });

              $(".diamond-grid").fadeIn(100);
          });
        }

        if (PartnersOn){

        }



         

        /* FB Data */
        try{
          if (SocialOn){
             FB.api('/upacm', 'GET',
              {
                "fields":"posts.limit("+fb_post_limit+"){message,full_picture,permalink_url,created_time,object_id},videos.limit("+fb_post_limit+"){live_status,embed_html,id}",
                "access_token": acctoken,
              },
              function(response) {
                  acctoken = response;
                  FBDataCallback(acctoken);
                  $(".fb-script-sm").remove();
              }
            );
          }
        }
        catch(err){
          console.log(err.message);
        }
        finally{
          $(".fadestart").addClass("fadedIn");
            setTimeout(function() {
              $(".fadedIn").removeClass("fadestart");
               $(".fadedIn").removeClass("fadedIn");
            }, 10000);

          $(".preloader").fadeOut();
        }
        
        
    });
   
  }


  function FBDataCallback(callback){
    //console.log(callback);
    var message ="";
    var tempmsg, imagepic, link, date;
    var dateoptions = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    const fb_post_limit_displayed = 4;

    for (var i = 0; i < fb_post_limit_displayed; i++){
      tempmsg = callback.posts.data[String(i)].message.replace(/\n/g, '<br>');
      link = callback.posts.data[String(i)].permalink_url;
      date = new Date(callback.posts.data[String(i)].created_time);
      imagepic = '<img src="' + callback.posts.data[String(i)].full_picture + '" class="img-fluid">';
      imagelink = FBPreviewHover(imagepic, link);
      message = message +  `<hr>
      <div class='row m-0'>
        <div class='col-lg-3 col-md-4 soc-media-photon d-flex flex-column'>
          ` + AddFBVids(imagelink, callback.posts.data[String(i)].object_id, callback.videos.data) +   `
        </div>
        <div class='col-lg-9 col-md-8 d-flex flex-column'>
          <p class="mb-3 socmed-date ml-auto mr-lg-0 mr-auto"> 
            <i class="fas fa-calendar-alt mr-2"></i>` + date.toLocaleString(undefined, dateoptions) + `
          </p>
          <div class='p-4'>
            ` + GetParagraph(tempmsg,500) + `
          </div>
        </div>
      </div>`;

    }

    $(".soc-fb").html(message);
  }

  function AddFBVids(imagestring, obj_id, video_array){


    let is_video = false;
    let counter = 0;
    let video_html = "";
    let is_live = false;
    let result = "";

    while(counter < video_array.length){

      if(obj_id == video_array[counter].id ){
        video_html = video_array[counter].embed_html;
        is_video = true;
        if (video_array[counter].live_status == "LIVE"){
          is_live = true;
        }

        break;
      }

      counter = counter + 1;
    }

    if(is_video == true){
      result = video_html;
    }
    else{
      result = imagestring;
    }


    return result;
  }

  function GetParagraph(msg, charcount){

    let tempmesg = msg.split("<br>");
    let result = "";
    let currentcount = 0;
    let currentindex = 0;

    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var hashtagRegEx = /(^|\s)(#[a-z\d][\w-]*)/ig;
    let the_html = "";
    const tagcolor = "#47565d";

    while( (currentcount <= charcount) && tempmesg[currentindex] != null ){
      currentcount = currentcount + tempmesg[currentindex].length;
      the_html =  tempmesg[currentindex].replace(urlRegex, function(url) { return '<a href="' + url + '">' + url + '</a>';});
      the_html = the_html.replace(hashtagRegEx, function(tag){ return '<span style="color:' + tagcolor + '">' + tag + '</span>' });
      result = result + "<p>" + the_html + "</p>";
      currentindex = currentindex+1;
    }

    return result;

  }

  function FBPreviewHover(image, link){
    
  return `<div class="soc-med-fbprev m-auto d-flex">
              <a href='` + link + `' class='m-auto d-block socmed-prevlink'>
                `+ image + `
                <div class="position-absolute soc-med-fbprev-overlay d-flex" style="top:0; left:0;">
                  <div class ="socmed-circle m-auto d-flex">
                    <i class="fas fa-external-link-alt m-auto"></i>
                  </div>
                </div>
              </a>
          </div>`;

  }