 
  var script_url = "https://script.google.com/macros/s/AKfycbz1b4YCWoYMxOol0cIuX_X0DOd0YS3zZTkzTg_q_b2Ik3nKZvY/exec";

  var loadingdone = 0;
  

  InitWebsite();
  

  function InitWebsite(){

    var action_url = script_url+"?action=read";

    var select = "main";

    var EventsOn = false;
    var HeaderMode = "Video";

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
        }
    

        if (EventsOn){
          select = "events";
          $.getJSON(action_url+"&purpose="+select, function (json2) {

              for (var i = 0; i < json.records.length; i++) {
                  /*alert(json2.records[i].Name+ json2.records[i].Description);*/
              }
                
            
          });
        }
        
    });

  
    





    loadingdone = loadingdone + 1;


  }

  $('.landing-scroll-down').click(function(){
      var y = $(window).scrollTop();
      $('html, body').animate({ scrollTop: $(".header").outerHeight() }, 1000) 
   }); 
 

  /*

    // Make an AJAX call to Google Script
    function insert_value() {
      
  	$("#re").css("visibility","hidden");
  	 document.getElementById("loader").style.visibility = "visible";
  	$('#mySpinner').addClass('spinner');

    var id1=	$("#id").val();
  	var name= $("#name").val();
    var data= $("#data2").val();
  	
  	
      var url = script_url+"?callback=ctrlq&name="+name+"&id="+id1+"&data2="+data+"&action=insert";
      console.log(url);
    

      var request = jQuery.ajax({
        crossDomain: true,
        url: url ,
        method: "GET",
        dataType: "jsonp"
      });

    }


    
  
 
  
  
  function update_value(){
	$("#re").css("visibility","hidden");
     document.getElementById("loader").style.visibility = "visible";
	
	
  var id1=	$("#id").val();
	var name= $("#name").val();
	var data= $("#data2").val();
	
	
    var url = script_url+"?callback=ctrlq&name="+name+"&id="+id1+"&data2="+data+"&action=update";
  

    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });

	
  }

  
 
  
  
  function delete_value(){
	$("#re").css("visibility","hidden");
     document.getElementById("loader").style.visibility = "visible";
	$('#mySpinner').addClass('spinner');
  var id1=	$("#id").val();
	var name= $("#name").val();
  var data= $("#data2").val();
	
	
    var url = script_url+"?callback=ctrlq&name="+name+"&id="+id1+"&data2="+data+"&action=delete";
  

    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });

  }


  
  
  // print the returned data
  function ctrlq(e) {
  
	
	$("#re").html(e.result);
	$("#re").css("visibility","visible");
	read_value();
	
  }
  
  

  
function read_value() {

$("#re").css("visibility","hidden");
   
   document.getElementById("loader").style.visibility = "visible";
 var url = script_url+"?action=read";

    // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        var header = table.createTHead();
        var row = header.insertRow(0);     
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
      
        cell1.innerHTML = "<b>ID</b>";
        cell2.innerHTML = "<b>Data</b>";
        cell3.innerHTML = "<b>Name</b>";
        

  $.getJSON(url, function (json) {

    // Set the variables from the results array
   

      
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < json.records.length; i++) {

            tr = table.insertRow(-1);
				    var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].ID;
    				tabCell = tr.insertCell(-1);
    				tabCell.innerHTML = json.records[i].DATA;
            tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json.records[i].NAME;
            }
       
		
    });


     // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);



    document.getElementById("loader").style.visibility = "hidden";
    $("#re").css("visibility","visible");
	} */