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

  window.eqfeed_callback = function(results) {
          for (var i = 0; i < results.features.length; i++) {
            var coords = results.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
          }
        }

  function initialize() {

        map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');

        // (In this example we use a locally stored copy instead.)
        // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
        document.getElementsByTagName('head')[0].appendChild(script);

        map.data.setStyle(function(feature) {
          var magnitude = feature.getProperty('mag');
          return {
            icon: getCircle(magnitude)
          };
        });
      }

      function getCircle(magnitude) {
        var circle = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        };
        return circle;
      }

      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
      }
