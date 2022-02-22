// Initializaton
// demographic_pull = "poverty_rate"
// demographic_code = "Poverty_Rate"
// health_pull = "low_food_access"
// health_code = "LFA_2019"
// disease_pull = "diabetes_rate"
// disease_code = "HCSDIAP_2016-2018"

// var myMap = null;


function updatemap(health_code){
  // console.log("test")
  // console.log(health_code)
  // console.log(health_pull)

  d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    // console.log(data.features);
    // map.off();
    // map.remove();
    // console.log(data.features.community)
    // myMap.remove()
    // if (myMap !== undefined && myMap !== null) {
      console.log("test")
      // console.log(myMap); // nothing should actually happen to the value of mymap  
      // myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
      console.log("test")
      // console.log(myMap); // nothing should actually happen to the value of mymap
    // }
    createFeatures(data.features);
    // layer.getPopup().setContent("123");
    // layer.getPopup().update();

  });

}



  // Until Pulldowns are working - assign demographic, health indicator and chronic disease variables of interest
  // demographic_pull = "Poverty Rate"
  // health_pull = "Low Food Access"
  // disease_pull = "Diabetes Mortality"

  demographic_pull = "poverty_rate"
  demographic_code = "Poverty_Rate"
  health_pull = "low_food_access"
  health_code = "LFA_2019"
  disease_pull = "diabetes_rate"
  disease_code = "HCSDIAP_2016-2018"
 
  // Need If then statements to convert good labels to database codes - following is placeholders
  // demographic_code = "POV_2015-2019"
  // health_code = "LFA_2019"
  // disease_code = "HDX_2015_2019"
  
  // Create Variable to Pass Disease and Demographic Variables of Interest to the Map
  // var horz = "LFA_2019"
  // var vert = "HDX_2015_2019"
  
  function createFeatures(communityData) {
  
    function onEachFeature(feature, layer) {
      var demographic = feature.properties[demographic_code]
      var health = feature.properties[health_code]
      var disease = feature.properties[disease_code]
      // console.log(disease)
      layer.bindPopup("<h2>" + feature.properties.community + "</h2> <hr> <h4>" + demographic_pull + ": " + demographic + "</h4> <hr> <h4>" + health_pull + ": " + health + "</h4> <hr> <h4>" + disease_pull + ": " + disease +"</h4>");
    }
  
    // Create a GeoJSON layer that contains the features array on the communityData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var communities = L.geoJSON(communityData, {
      onEachFeature: onEachFeature
    });
  
    // Send our communities layer to the createMap function/
    // if (myMap !== undefined && mymap !== null) {
    //   myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    //   console.log(myMap); // nothing should actually happen to the value of mymap
    // }
    createMap(communities);
    // console.log(communities);
  }


  
  function createMap(communities) {


    // if (myMap !== undefined && mymap !== null) {
    //   myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    //   console.log(myMap); // nothing should actually happen to the value of mymap
    // }

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
      // "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Communities: communities
    };
  
    // Create our map, giving it the streetmap and communities layers to display on load.
    
    var myMap = L.map("map", {
      center: [41.8181, -87.6298],
      zoom: 10,
      layers: [street, communities]
    });

    // this.myMap = L.map(this.mapContainer.nativeElement, {
    //   center: [41.8181, -87.6298],
    //   zoom: 10,
    //   layers: [street, communities]
    // });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
}

let queryUrl="http://127.0.0.1:5000/api/geojson"
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  // console.log(data.features);
  // console.log(data.features.community)
  createFeatures(data.features);
});

function disease_parameters(new_disease){
  disease_pull = new_disease
  if (new_disease == "diabetes_rate"){
    disease_code = "HCSDIAP_2016-2018"
  }
  if (new_disease == "diabetes_mortality"){
    disease_code = "VRDIAR_2015-2019"
  }
  if (new_disease == "diabetes_related_mortality"){
    disease_code = "VRDIBR_2015_2019"
  }
  if (new_disease == "cancer_mortality"){
    disease_code = "VRCAR_2015_2019"
  }
  if (new_disease == "alzheimer_mortality"){
    disease_code = "VRADR_2015_2019"
  }
  if (new_disease == "hypertension_rate"){
    disease_code = "HCSHYTP_2016_2018"
  }
  if (new_disease == "obesity_rate"){
    disease_code = "HCSOBP_2016_2018"
  }
  if (new_disease == "coronary_hear_disease_rate"){
    disease_code = "VRCHDR_2015_2019"
  }
  console.log(disease_pull + " " + disease_code)
  // updatemap(disease_code)
}

function health_parameters(new_health){
  health_pull = new_health
  // if (new_health == "adult_physical_inactivity"){
  //   health_code = "HCSPAP_2016-2018"
  // }
  if (new_health == "adult_soda"){
    health_code = "HCSSP_2016_2018"
  }
  if (new_health == "routine_checkup"){
    health_code = "HCSRCP_2016_2018"
  }
  if (new_health == "adult_smoking"){
    health_code = "HCSSMKP_2016-2018"
  }
  if (new_health == "routine_checkup"){
    health_code = "HCSRCP_2016_2018"
  }
  if (new_health == "adult_smoking"){
    health_code = "HCSSMKP_2016_2018"
  }
  if (new_health == "adult_binge_drink"){
    health_code = "HCSBDP_2016_2018"
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
    health_code = "HDX_2015_2019"
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
  console.log(health_pull + " " + health_code)
  // updatemap(health_code)
}

function demographic_parameters(new_demographic){
  demographic_pull = new_demographic
  if (new_demographic == "median_household_income"){
    demographic_code = "Median_Household_Income"
  }
  if (new_demographic == "poverty_rate"){
    demographic_code = "Poverty_Rate"
  }
  if (new_demographic == "food_stamps"){
    demographic_code = "Receiving_Food_Stamps"
  }
  if (new_demographic == "pub_assistance_income"){
    demographic_code = "Public_Assistance_Income"
  }
  if (new_demographic == "hs_grad_rate"){
    demographic_code = "High_School_Grad_Rate"
  }
  if (new_demographic == "college_grad_rate"){
    demographic_code = "College_Grad_Rate"
  }
  if (new_demographic == "non_hispanic_white"){
    demographic_code = "Non_Hispanic_White"
  }
  if (new_demographic == "non_hispanic_black"){
    demographic_code = "Non_Hispanic_Black"
  }
  if (new_demographic == "hispanic_or_latino"){
    demographic_code = "Hispanic_or_Latino"
  }
  if (new_demographic == "pop_all"){
    demographic_code = "Population_All"
  }
  if (new_demographic == "pop_infants"){
    demographic_code = "Population_Infants"
  }
  if (new_demographic == "pop_juv"){
    demographic_code = "Population_Juveniles"
  }
  if (new_demographic == "pop_young_adults"){
    demographic_code = "Population_Young_Adults"
  }
  if (new_demographic == "pop_mid_age"){
    demographic_code = "Population_Middle_Aged_Adults"
  }
  if (new_demographic == "pop_seniors"){
    demographic_code = "Population_Seniors"
  }
  console.log(demographic_pull + " " + demographic_code)
}


// function to call when a option is changed by user
function disease_parameter(new_disease) {
  // console.log(new_disease)
  disease_parameters(new_disease);
}

function health_parameter(new_health) {
  // console.log(new_health)
  health_parameters(new_health);
}

function demographic_parameter(new_demographic) {
  // console.log(new_demographic)
  demographic_parameters(new_demographic);
}
