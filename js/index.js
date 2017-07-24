var content = document.getElementById("content");
var requestURL = "data/power_consumption.json";
var request = new XMLHttpRequest();
var arrs;
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
/* request.onload = function() {
    var data = request.response;
    for (var item in data) {
        var day = JSON.parse(data[item]);
        
        obsArr.push(day.glb_act_pwr_mean);
        foreArr.push(day.glb_act_pwr_forecast);

        var dayDiv = document.createElement('div');
        dayDiv.className = "day";
        var myh5 = document.createElement('h5');
        var observed = document.createElement('p');
        var predicted = document.createElement('p');
        var voltage = document.createElement('p');
        var sub1 = document.createElement('p');
        var sub2 = document.createElement('p');
        var sub3 = document.createElement('p');

        myh5.textContent = day.Date;
        observed.innerHTML = "Observed mean: " + day.glb_act_pwr_mean + "<br>" + "Observed SD: " + day.glb_act_pwr_sd;
        predicted.innerHTML = "Forecast: " + day.glb_act_pwr_forecast + "<br>" + "Forecast error: " + day.glb_act_pwr_forecast_error;
        voltage.innerHTML = "Voltage mean: " + day.voltage_mean + "<br>Voltage SD: " + day.voltage_sd;
        sub1.innerHTML = "Sub 1 mean: " + day.sub1_mean + "<br>Sub 1 SD: " + day.sub1_sd;
        sub2.innerHTML = "Sub 2 mean: " + day.sub2_mean + "<br>Sub 2 SD: " + day.sub2_sd;
        sub3.innerHTML = "Sub 3 mean: " + day.sub3_mean + "<br>Sub 3 SD: " + day.sub3_sd;

        content.appendChild(dayDiv);
        dayDiv.appendChild(myh5);
        dayDiv.appendChild(observed);
        dayDiv.appendChild(predicted);
        dayDiv.appendChild(voltage);
        dayDiv.appendChild(sub1);
        dayDiv.appendChild(sub2);
        dayDiv.appendChild(sub3);
    }
} */
request.onload = function() {
    var data = request.response;
    var dates = [];
    var obs = [];
    var fore = [];
    for (var i = 0; i < 60; i++) {
        var day = JSON.parse(data[i]);
        dates.push(day.Date);
        obs.push(day.glb_act_pwr_mean);
        fore.push(day.glb_act_pwr_forecast);
    }

    console.log(obs);
    console.log(fore);

    var trace1 = {
        x: dates,
        y: obs,
        marker: {         // marker is an object, valid marker keys: #scatter-marker
                color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
            },
        name: "Observed",
        type: 'scatter'
      };

    var trace2 = {
        x: dates,
        y: fore,
        name: "Forecast",
        type: 'scatter'
      };

    data = [trace1, trace2];

    layout = {                     // all "layout" attributes: #layout
        title: 'simple example',  // more about "layout.title": #layout-title
        xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
            title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
        }
    };

    Plotly.newPlot('plotly', data, layout);

}

/* var trace1 = {
    x: ["2006-12-30", "2006-12-31", "2007-01-01", "2007-01-02", "2007-01-03", "2007-01-04", "2007-01-05"],
    y: tempY,
    marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
        },
    name: "Observed",
    type: 'scatter'
  };

var trace2 = {
    x: ["2006-12-30", "2006-12-31", "2007-01-01", "2007-01-02", "2007-01-03", "2007-01-04", "2007-01-05"],
    y: [1.93852, 1.98809, 2.09869, 2.09912, 1.83936, 1.72919, 1.7751 ],
    name: "Forecast",
    type: 'scatter'
  };

data = [trace1, trace2];

layout = {                     // all "layout" attributes: #layout
    title: 'simple example',  // more about "layout.title": #layout-title
    xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
    }
};

Plotly.newPlot('plotly', data, layout); */
