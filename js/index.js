var button = document.getElementById("myBtn");
var requestURL = "data/power_consumption.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.addEventListener("load", transferComplete);

function transferComplete(e){
    drawGraphs(request.response, 10, 18);
}
var cat;
button.addEventListener("click", function(e) {
    cat = drawGraphs(request.response, 0, 8);
    console.log(cat);
});

function drawGraphs(response, begin, end) {
    var data = response;
    var dates = [];
    var obs = [];
    var obsSD = [];
    var fore = [];
    var sub1 = [];
    var sub1SD = [];
    var sub2 = [];
    var sub2SD = [];
    var sub3 = [];
    var sub3SD = [];
    var volt = [];
    for (var i = begin; i < end; i++) {
        var day = JSON.parse(data[i]);
        dates.push(day.Date);
        obs.push(day.glb_act_pwr_mean);
        obsSD.push(day.glb_act_pwr_sd);
        fore.push(day.glb_act_pwr_forecast);
        sub1.push(day.sub1_mean);
        sub1SD.push(day.sub1_sd);
        sub2.push(day.sub2_mean);
        sub2SD.push(day.sub2_sd);
        sub3.push(day.sub3_mean);
        sub3SD.push(day.sub3_sd);
        volt.push(day.voltage_mean);
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

    var voltage = [{
        x: dates,
        y: volt,
        name: "Voltage",
        type: 'scatter'
      }];

    Plotly.newPlot('plotly', data, layout);
    Plotly.newPlot('subs', subs);
    Plotly.newPlot('voltage', voltage);

    return "cat";
}
