// Initializaton
demographic_code = "POV_2015-2019"
health_code = "LFA_2019"
disease_code = "HDX_2015_2019"

let queryUrl="http://127.0.0.1:5000/api/geojson"

function disease_parameters(new_disease){
  // disease_pull = new_disease
  if (new_disease == "diabetes_rate"){
    disease_code = "HCSDIAP_2016-2018"
  }
  if (new_disease == "diabetes_mortality"){
    disease_code = "VRDIAR_2015-2019"
  }
  if (new_disease == "diabetes_related_mortality"){
    disease_code = "VRDIBR_2015-2019"
  }
  if (new_disease == "cancer_mortality"){
    disease_code = "VRCAR_2015-2019"
  }
  if (new_disease == "alzheimer_mortality"){
    disease_code = "VRADR_2015-2019"
  }
  if (new_disease == "hypertension_rate"){
    disease_code = "HCSHYTP_2016-2018"
  }
  if (new_disease == "obesity_rate"){
    disease_code = "HCSOBP_2016-2018"
  }
  if (new_disease == "coronary_hear_disease_rate"){
    disease_code = "VRCHDR_2015-2019"
  }
  console.log(disease_code)
  updatemap
}

function health_parameters(new_health){
  // health_pull = new_health
  if (new_health == "adult_physical_inactivity"){
    health_code = "HCSPAP_2016-2018"
  }
  if (new_health == "adult_soda"){
    health_code = "HCSSP_2016-2018"
  }
  if (new_health == "routine_checkup"){
    health_code = "HCSRCP_2016-2018"
  }
  if (new_health == "adult_smoking"){
    health_code = "HCSSMKP_2016-2018"
  }
  if (new_health == "routine_checkup"){
    health_code = "HCSRCP_2016_2018"
  }
  if (new_health == "adult_smoking"){
    health_code = "HCSSMKP_2016-2018"
  }
  if (new_health == "adult_binge_drink"){
    health_code = "HCSBDP_2016-2018"
  }
  if (new_health == "fruit_veg_servings"){
    health_code = "HCSFVP_2016-2018"
  }
  if (new_health == "access_fruit_veg"){
    health_code = "HCSFVAP_2016-2018"
  }
  if (new_health == "low_food_access"){
    health_code = "LFA_2019"
  }
  if (new_health == "pm"){
    health_code = "PMC_2020"
  }
  if (new_health == "uninsured"){
    health_code = "UNS_2015-2019"
  }
  if (new_health == "hardship"){
    health_code = "HDX_2015-2019"
  }
  if (new_health == "life_expectancy"){
    health_code = "VRLE_2019"
  }
  if (new_health == "received_care"){
    health_code = "HCSNCP_2016-2018"
  }
  if (new_health == "low_birthrate"){
    health_code = "VRBWP_2013-2017"
  }
  if (new_health == "overall_health_status"){
    health_code = "HCSOHSP_2016-2018"
  }
  
  console.log(health_code)
  updatemap(health_code)
}

// function test(){
//   console.log("test")
//   console.log(disease_code)
// }

function updatemap(health_code){
  console.log("test")
  console.log(health_code)
  console.log(health_pull)

  d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data.features);
    map.off();
    map.remove();
    // console.log(data.features.community)
    // createFeatures(data.features);
  });

}

d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data.features);
    // console.log(data.features.community)
    createFeatures(data.features);
  });

  // Until Pulldowns are working - assign demographic, health indicator and chronic disease variables of interest
  demographic_pull = "Poverty Rate"
  health_pull = "Low Food Access"
  disease_pull = "Diabetes Mortality"
 
  // Need If then statements to convert good labels to database codes - following is placeholders
  demographic_code = "POV_2015-2019"
  // health_code = "LFA_2019"
  // disease_code = "HDX_2015_2019"
  
  // Create Variable to Pass Disease and Demographic Variables of Interest to the Map
  var horz = "LFA_2019"
  var vert = "HDX_2015_2019"
  
  function createFeatures(earthquakeData) {
  
    
    // console.log(x_axis)
    // var y_axis = "y_data"  
    // layer.bindPopup("<h2>" + feature.properties.community + "</h2> <hr> <h2>" + x_axis + "</h2> <hr> <h2>" + y_axis + "</h2>");


    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      var demographic = feature.properties[demographic_code]
      var health = feature.properties[health_code]
      var disease = feature.properties[disease_code]
      console.log(disease)
      // console.log(x_axis)
      // console.log(y_axis)
      // layer.bindPopup(`<h3>${feature.properties.community}</h3><hr><p>${new Date(feature.properties.community)}</p>`);
      layer.bindPopup("<h2>" + feature.properties.community + "</h2> <hr> <h4>" + demographic_pull + ": " + demographic + "</h4> <hr> <h4>" + health_pull + ": " + health + "</h4> <hr> <h4>" + disease_pull + ": " + disease +"</h4>");
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }


  
  
  
  
  function createMap(earthquakes) {
  
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [41.8781, -87.6298],
      zoom: 10,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
}

// function to call when a option is changed by user
function disease_parameter(new_disease) {
  console.log(new_disease)
  disease_parameters(new_disease);
}

function health_parameter(new_health) {
  console.log(new_health)
  health_parameters(new_health);
}