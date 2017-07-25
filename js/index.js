var button = document.getElementById("myBtn");
var powerData;
var viewSize = 30;
function currentStart(end, size) { 
    return end - size;
}

var requestURL = "data/power_consumption.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.addEventListener("load", transferComplete);

function transferComplete(e){
    powerData = getPowerData(request.response);
    var start = currentStart(powerData[0].length, viewSize);
    getView(powerData, viewSize, start);
}
button.addEventListener("click", function(e) {
    //getView(powerData, 8, powerData[0].length - 8);
});

function getPowerData(response) {
    var data = response;
    var dates = [];
    var obs = [];
    var fore = [];
    var sub1 = [];
    var sub2 = [];
    var sub3 = [];
    var volt = [];
    for (var i = 0; i < data.length; i++) {
        var day = JSON.parse(data[i]);
        dates.push(day.Date);
        obs.push(day.glb_act_pwr_mean);
        fore.push(day.glb_act_pwr_forecast);
        sub1.push(day.sub1_mean);
        sub2.push(day.sub2_mean);
        sub3.push(day.sub3_mean);
        volt.push(day.voltage_mean);
    }
    return [dates, obs, fore, sub1, sub2, sub3, volt];
}

function getStartDate(data) {
    
}

function getView(data, size, begin) {
    var viewData = [[], [], [], [], [], [], []];
    for (var i = 0; i < data.length; i++) {
        for (var j = begin; j < begin + size; j++) {
             viewData[i].push(data[i][j]);
        }
    }
    drawGraphs(viewData);
    //return viewData;
}

function drawGraphs(data){
    var observed = {
        x: data[0],
        y: data[1],
        marker: {         // marker is an object, valid marker keys: #scatter-marker
                color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
            },
        name: "Observed",
        type: 'scatter'
      };

    var forecast = {
        x: data[0],
        y: data[2],
        name: "Forecast",
        type: 'scatter'
      };

    var voltage = {
        x: data[0],
        y: data[6],
        xaxis: 'x2',
        yaxis: 'y2',
        name: "Voltage",
        type: 'scatter'
      };

    var consumption = [observed, forecast, voltage];
    
    var topLayout = {
        yaxis2: {domain: [0, .2]},
        xaxis2: {anchor: 'y2'},
        yaxis: {domain: [.3, 1]},
        margin: {
            t:0
        }
    };

    var sub1graph = {
            x: data[0],
            y: data[3],
            name: "Sub-component 1",
            type: "bar"
        };

    var sub2graph = {
            x: data[0],
            y: data[4],
            xaxis: 'x2',
            yaxis: 'y2',
            name: "Sub-component 2",
            type: "bar"
        };

    var sub3graph = {
            x: data[0],
            y: data[5],
            xaxis: 'x3',
            yaxis: 'y3',
            name: "Sub-component 3",
            type: "bar"
        };

    var subs = [sub1graph, sub2graph, sub3graph];

    var subsLayout = {
      xaxis: {domain: [0, .32]},
      yaxis2: {anchor: 'x2'},
      xaxis2: {domain: [0.35, .66]},
      yaxis3: {anchor: 'x3'},
      xaxis3: {domain: [0.69, 1]},
        margin: {
            t:0
        }
    };

    Plotly.newPlot('consumption', consumption, topLayout);
    Plotly.newPlot('subs', subs, subsLayout);
    //Plotly.newPlot('voltage', voltage);
}
