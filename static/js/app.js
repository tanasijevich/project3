
//this api generates a table containing community information 
d3.json("api/community").then((data) => {

  console.log(data)
  
  $('#example').DataTable({
      data: data['table'],
      columns: [
          { title: "Community Name" },
          { title: "GEOID" },
          { title: "Population" },
          { title: "Longitude" },
          { title: "Latitude" },
          
 
      ]
  });

})

// generates scatter plot between hardship index and user selected disease 

function buildDeceaseChart(decease) {

  console.log(decease);

  d3.json(`api/deceases/${decease}`).then((data) => {

    var trace1 = {
      type: 'scatter',
      x: data['decease_name'],
      y: data['hd_index'],
      mode: 'markers',
      
    };
    
    var data = [ trace1 ];
    
    var layout = { 
      title: 'Mortality rate of the disease with Hardship index',
    };
    
    var config = {responsive: true}
    
    Plotly.newPlot('scatter', data, layout, config );
  
  })
}

// function to call when a option is changed by user
function optionDeceaseChanged(new_decease) {
  buildDeceaseChart(new_decease);
}

//build chart
buildDeceaseChart("All Cause");



