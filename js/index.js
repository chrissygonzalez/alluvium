var powerData;
var currentView = {
    viewSize: 30,
    startIndex: 0,
    endIndex: 0
}

var title = document.getElementById("title");
var btn7 = document.getElementById("btn7");
var btn30 = document.getElementById("btn30");
var btn60 = document.getElementById("btn60");
var btn90 = document.getElementById("btn90");
var btn120 = document.getElementById("btn120");
var back = document.getElementById("back");
var forward = document.getElementById("forward");

var requestURL = "data/power_consumption.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.addEventListener("load", transferComplete);

function transferComplete(e){
    powerData = getPowerData(request.response);
    setStart(powerData[0].length);
    var start = getStart();
    var size = getSize();
    getViewData(powerData, size, start);
    setTitle();
}

function setStart(end) {
    currentView.endIndex = end;
    currentView.startIndex = currentView.endIndex - currentView.viewSize;
}

function getStart() { 
    return currentView.startIndex;
}

function setEnd(action){
    var currentEnd = getEnd();
    var size = getSize();
    if (action > 0) {
        if (currentEnd + size < powerData.length) {
            currentView.endIndex = currentEnd + size;
        } else {
            currentView.endIndex = powerData[0].length;
        }
    } else if (action < 0) {
        if (currentEnd - size > 0) {
            currentView.endIndex = currentEnd - size;
        } else {
            currentView.endIndex = size;
        }
    }
}

function getEnd(){
    return currentView.endIndex;
}

function setSize(size) { 
    currentView.viewSize = size;
}

function getSize() { 
    return currentView.viewSize;
}

btn7.addEventListener("click", function(e) {
    setSize(7);
    changeView();
});

btn30.addEventListener("click", function(e) {
    setSize(30);
    changeView();
});

btn60.addEventListener("click", function(e) {
    setSize(60);
    changeView();
});

btn90.addEventListener("click", function(e) {
    setSize(90);
    changeView();
});

btn120.addEventListener("click", function(e) {
    setSize(120);
    changeView();
});

back.addEventListener("click", function(e) {
    setEnd(-1);
    changeView();
});

forward.addEventListener("click", function(e) {
    setEnd(1);
    changeView();
});

function changeView() {
    setStart(getEnd());
    var size = getSize();
    var start = getStart();
    getViewData(powerData, size, start);
    setTitle();
}

function setTitle(){
    var start = getStart();
    var end = getEnd();
    var startDate = new Date(powerData[0][start]);
    var endDate = new Date(powerData[0][end - 1]);
    title.innerHTML = startDate.toDateString().slice(4) + " – " + endDate.toDateString().slice(4);
}

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

function getViewData(data, size, begin) {
    var viewData = [[], [], [], [], [], [], []];
    for (var i = 0; i < data.length; i++) {
        for (var j = begin; j < begin + size; j++) {
             viewData[i].push(data[i][j]);
        }
    }
    drawGraphs(viewData);
}

function drawGraphs(data){
    var observed = {
        x: data[0],
        y: data[1],
        xaxis: 'x',
        name: "Observed",
        type: 'scatter',
        line: {
            shape: "spline",
            smoothing: 0.5,
            width: 8,
            color: "#8FCAC4"
        }
      };

    var forecast = {
        x: data[0],
        y: data[2],
        xaxis: 'x',
        name: "Forecast",
        type: 'scatter',
        line: {
            shape: "spline",
            smoothing: 0.5,
            width: 3,
            dash: "dot",
            color: "#267D75"
        }
      };

    var voltage = {
        x: data[0],
        y: data[6],
        xaxis: 'x2',
        yaxis: 'y2',
        name: "Voltage",
        type: 'scatter',
        line: {
            shape: "spline",
            smoothing: 0.5,
            width: 8,
            color: "#99CA8F"
        }
      };

    var consumption = [observed, forecast, voltage];
    
    var topLayout = {
        title: "Title",
        paper_bgcolor: "#252831",
        plot_bgcolor: "#252831",
        yaxis2: {
            domain: [0, .2],
            tickfont: {
                family: "Overpass",
                color: "#999"
                }
            },
        xaxis2: {
            anchor: 'y2',
            title: "AVERAGE VOLTAGE",
            titlefont: {
                family: "Overpass",
                color: "#fff"
                },
            tickfont: {
                family: "Overpass",
                color: "#999"
                },
        },
        xaxis: {
            title: "AVERAGE POWER CONSUMPTION (kW)",
            titlefont: {
                family: "Overpass",
                color: "#fff"
                },
            tickfont: {
                family: "Overpass",
                color: "#999"
                },
        },
        yaxis: {
            domain: [.5, 1],
            tickfont: {
                family: "Overpass",
                color: "#999"
                }
            },
        margin: {
            t:0
        },
        legend: {
            font: {color: "999"},
            orientation: "h"
        }
    };

    var sub1graph = {
            x: data[0],
            y: data[3],
            name: "Sub-component 1",
            type: "bar",
            marker: {
                color: "#5F667D"
            }
        };

    var sub2graph = {
            x: data[0],
            y: data[4],
            xaxis: 'x2',
            yaxis: 'y2',
            name: "Sub-component 2",
            type: "bar",
            marker: {
                color: "#6A6994"
            }
        };

    var sub3graph = {
            x: data[0],
            y: data[5],
            xaxis: 'x3',
            yaxis: 'y3',
            name: "Sub-component 3",
            type: "bar",
            marker: {
                color: "#697E94"
            }
        };

    var subs = [sub1graph, sub2graph, sub3graph];

    var subsLayout = {
        showlegend: false,
        paper_bgcolor: "#252831",
        plot_bgcolor: "#252831",
      xaxis: {
        domain: [0, .32],
        title: "SUB-COMPONENT 1 (kWh)",
        titlefont: {
            family: "Overpass",
            color: "#fff"
            },
        tickfont: {
            family: "Overpass",
            color: "#999"
            },
        },
      yaxis2: {anchor: 'x2'},
      xaxis2: {
        domain: [0.35, .66],
        title: "SUB-COMPONENT 2 (kWh)",
        titlefont: {
            family: "Overpass",
            color: "#fff"
            },
        tickfont: {
            family: "Overpass",
            color: "#999"
            },
        },
      yaxis3: {anchor: 'x3'},
      xaxis3: {
        domain: [0.69, 1],
        title: "SUB-COMPONENT 3 (kWh)",
        titlefont: {
            family: "Overpass",
            color: "#fff"
            },
        tickfont: {
            family: "Overpass",
            color: "#999"
            },
        },
        margin: {
            t:30
        }
    };

    Plotly.newPlot('consumption', consumption, topLayout);
    Plotly.newPlot('subs', subs, subsLayout);
}
