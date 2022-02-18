// Creating the map object
var myMap = L.map("map", {
  // center: [40.7128, -74.0059],
  center: [41.8781, -87.6298],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
// var link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";
// var link = "../data/chicago-community-areas.geojson";
// var link = "/api/geojson";
// var link = "http://127.0.0.1:5000/api/geojson"
var link = "https://data.cityofchicago.org/resource/igwz-8jzy.json"

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(borough) {
  if (borough == "Brooklyn") return "yellow";
  else if (borough == "Bronx") return "red";
  else if (borough == "Manhattan") return "orange";
  else if (borough == "Queens") return "green";
  else if (borough == "Staten Island") return "purple";
  else return "black";
}

// /api/geojson
// d3.json(`api/deceases/${decease}`).then((data) => {

// Getting our GeoJSON data
d3.json(link).then(function(your_data) {

  data = your_data

  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        // fillColor: chooseColor(feature.properties.borough),
        fillColor: "blue"
        // fillOpacity: 0.5,
        // weight: 1.5
      };
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer, bindPopup) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9,
          });

        },

        // mouseover: popup("Text"),

        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
          
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        // click: function(event) {
        //   myMap.fitBounds(event.target.getBounds());
        // }

        // marker.bindPopup("Popup content");
        // marker.on('mouseover', function (e) {
        //     this.openPopup();
        // });
        // marker.on('mouseout', function (e) {
        //     this.closePopup();
        // });

      });

      var x_axis = "x_data"
      var y_axis = "y_data"  
      // Giving each feature a popup with information that's relevant to it
      // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
      // layer.bindPopup("<h2>" + feature.properties.community + "</h2>");
      layer.bindPopup("<h2>" + feature.properties.community + "</h2> <hr> <h2>" + x_axis + "</h2> <hr> <h2>" + y_axis + "</h2>");


    }
  }).addTo(myMap);
});
