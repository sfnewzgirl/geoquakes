// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

  $.ajax ({
    method: 'GET',
    url: weekly_quakes_endpoint,
    datatype: 'json',
    success: onSuccess,
  })

});

  function onSuccess(json) {
    //SUCCESS calls first earthquake
    //console.log(json.features[0]);

    var jsonData = json;
//    console.log("heres our data:", jsonData);

    var source = $('#recent_earthquakes').html();
//      console.log(source);

    var quakeTemplate = Handlebars.compile(source);

    var quakeHtml = quakeTemplate({earthquakes: jsonData.features });

//    console.log(quakeHtml);

    $("#quake_list").append(quakeHtml);

  };
