var content = document.getElementById("content");
var requestURL = "data/power_consumption.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    var data = request.response;
    var dates = [];
    var obs = [];
    var fore = [];
    var sub1 = [];
    var sub2 = [];
    var sub3 = [];
    for (var i = 10; i < 18; i++) {
        var day = JSON.parse(data[i]);
        dates.push(day.Date);
        obs.push(day.glb_act_pwr_mean);
        fore.push(day.glb_act_pwr_forecast);
        sub1.push(day.sub1_mean);
        sub2.push(day.sub2_mean);
        sub3.push(day.sub3_mean);
    }

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

    var sub1graph = {
            x: dates,
            y: sub1,
            name: "Sub-component 1",
            type: "bar"
        };

    var sub2graph = {
            x: dates,
            y: sub2,
            name: "Sub-component 2",
            type: "bar"
        };

    var sub3graph = {
            x: dates,
            y: sub3,
            name: "Sub-component 3",
            type: "bar"
        };

    var subs = [sub1graph, sub2graph, sub3graph];

    Plotly.newPlot('plotly', data, layout);
    Plotly.newPlot('sub1', subs);
}
