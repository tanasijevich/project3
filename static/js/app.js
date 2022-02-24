d3.json("api/community").then((data) => {

  console.log(data)
  
  $('#example').DataTable({
      data: data['table'],
      columns: [
          { title: "Community Name" },
          { title: "Median_Household_Income" },
          { title: "Poverty_Rate" },
          { title: "Receiving_Food_Stamps" },
          { title: "Public_Assistance_Income" },
          { title: "High_School_Grad_Rate" },
          { title: "College_Grad_Rate" },
          { title: "Non_Hispanic_White" },
          { title: "Non_Hispanic_Black" },
          { title: "Asian_Pacific_Islander" },
          { title: "Hispanic_or_Latino" },
          { title: "Population_All" },
	        { title: "Population_Infants" },
          { title: "Population_Juveniles" },
          { title: "Population_Young_Adults" },
          { title: "Population_Middle_Aged_Adults" },
          { title: "Population_Seniors" }, 
        
        
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
    var lr = linearRegression(trace1.x, trace1.y);
var fit_from = Math.min(...trace1.x)
var fit_to = Math.max(...trace1.x)
var fit = {
  x: [fit_from, fit_to],
  y: [fit_from*lr.sl+lr.off, fit_to*lr.sl+lr.off],
  mode: 'lines',
  type: 'scatter',
  name: "R2=".concat((Math.round(lr.r2 * 10000) / 10000).toString())
};

    
    var data = [ trace1,fit];
    
    var layout = { 
      title: 'Chronic Disease vs Hardship Index',
    };
    
    var config = {responsive: true}
    
    Plotly.newPlot('scatter', data, layout, config );
    //////////////////////////////////////////////////////////
    function linearRegression(x,y){
      var lr = {};
      var n = y.length;
      var sum_x = 0;
      var sum_y = 0;
      var sum_xy = 0;
      var sum_xx = 0;
      var sum_yy = 0;

      for (var i = 0; i < y.length; i++) {

          sum_x += x[i];
          sum_y += y[i];
          sum_xy += (x[i]*y[i]);
          sum_xx += (x[i]*x[i]);
          sum_yy += (y[i]*y[i]);
      } 

      lr['sl'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
      lr['off'] = (sum_y - lr.sl * sum_x)/n;
      lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

      return lr;
}
  
  })
}
///////////////////////////////
function buildDeceaseChart_Soda(decease) {

  console.log(decease);

  d3.json(`api/deceases/${decease}`).then((data) => {

    var trace1 = {
      type: 'scatter',
      x: data['decease_name'],
      y: data['soda_con'],
      mode: 'markers',
      
    };
    var lr = linearRegression(trace1.x, trace1.y);
var fit_from = Math.min(...trace1.x)
var fit_to = Math.max(...trace1.x)
var fit = {
  x: [fit_from, fit_to],
  y: [fit_from*lr.sl+lr.off, fit_to*lr.sl+lr.off],
  mode: 'lines',
  type: 'scatter',
  name: "R2=".concat((Math.round(lr.r2 * 10000) / 10000).toString())
};

    
    var data = [ trace1,fit];
    
    var layout = { 
      title: 'Mortality rate of the disease with Soda Consumption',
    };
    
    var config = {responsive: true}
    
    Plotly.newPlot('scatter_soda', data, layout, config );
    //////////////////////////////////////////////////////////
    function linearRegression(x,y){
      var lr = {};
      var n = y.length;
      var sum_x = 0;
      var sum_y = 0;
      var sum_xy = 0;
      var sum_xx = 0;
      var sum_yy = 0;

      for (var i = 0; i < y.length; i++) {

          sum_x += x[i];
          sum_y += y[i];
          sum_xy += (x[i]*y[i]);
          sum_xx += (x[i]*x[i]);
          sum_yy += (y[i]*y[i]);
      } 

      lr['sl'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
      lr['off'] = (sum_y - lr.sl * sum_x)/n;
      lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

      return lr;
}
  
  })
}

function buildDeceaseChart_Smoking(decease) {

  console.log(decease);

  d3.json(`api/deceases/${decease}`).then((data) => {

    var trace1 = {
      type: 'scatter',
      x: data['decease_name'],
      y: data['smoking'],
      mode: 'markers',
            
    };
    var lr = linearRegression(trace1.x, trace1.y);
var fit_from = Math.min(...trace1.x)
var fit_to = Math.max(...trace1.x)
var fit = {
  x: [fit_from, fit_to],
  y: [fit_from*lr.sl+lr.off, fit_to*lr.sl+lr.off],
  mode: 'lines',
  type: 'scatter',
  name: "R2=".concat((Math.round(lr.r2 * 10000) / 10000).toString())
};

    
    var data = [ trace1,fit];
    
    var layout = { 
      title: 'Mortality rate of the disease with smoking habit',
    };
    
    var config = {responsive: true}
    
    Plotly.newPlot('scatter_smoking', data, layout, config );
    //////////////////////////////////////////////////////////
    function linearRegression(x,y){
      var lr = {};
      var n = y.length;
      var sum_x = 0;
      var sum_y = 0;
      var sum_xy = 0;
      var sum_xx = 0;
      var sum_yy = 0;

      for (var i = 0; i < y.length; i++) {

          sum_x += x[i];
          sum_y += y[i];
          sum_xy += (x[i]*y[i]);
          sum_xx += (x[i]*x[i]);
          sum_yy += (y[i]*y[i]);
      } 

      lr['sl'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
      lr['off'] = (sum_y - lr.sl * sum_x)/n;
      lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

      return lr;
}
  
  })
}
/////////////////////////////
// function to call when a option is changed by user
function optionDeceaseChanged(new_decease) {
  buildDeceaseChart(new_decease);
  buildDeceaseChart_Soda(new_decease);
  buildDeceaseChart_Smoking(new_decease);
}

//build chart
buildDeceaseChart("Diabetes");
buildDeceaseChart_Soda("Diabetes");
buildDeceaseChart_Smoking("Diabetes");

