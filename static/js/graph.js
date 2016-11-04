
function displayGraph(surfaceTempSerie, surfaceWindSpeed, surfaceWaveHeight, surfaceAirTemp) {
     Highcharts.chart('sea_surface_temperature', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Sea Surface Temperature'
        },
        xAxis: {
            categories: [
                'Day7',
                'Day6',
                'Day5',
                'Day4',
                'Day3',
                'Day2',
                'Today',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'degrés celsius'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} c°</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: surfaceTempSerie
    });

    Highcharts.chart('surface_wind_speed', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Surface Wind speed'
        },
        xAxis: {
            categories: [
                'Day7',
                'Day6',
                'Day5',
                'Day4',
                'Day3',
                'Day2',
                'Today',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'metres par seconde'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: surfaceWindSpeed
    });

    Highcharts.chart('surface_wave_height', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Surface Wave Height'
        },
        xAxis: {
            categories: [
                'Day7',
                'Day6',
                'Day5',
                'Day4',
                'Day3',
                'Day2',
                'Today',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'metre'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} m</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: surfaceWaveHeight
    });

    Highcharts.chart('surface_air_temperature', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Air Surface Temperature'
        },
        xAxis: {
            categories: [
                'Day7',
                'Day6',
                'Day5',
                'Day4',
                'Day3',
                'Day2',
                'Today',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'degrés celsius'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} c°</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: surfaceAirTemp
    });
}

function allGraph() {
    var surfaceTempSerie = [];
    var surfaceWindSpeed = [];
    var surfaceWaveHeight = [];
    var surfaceAirTemp = [];

    for(var i = 0; i < steps.length; i++) {
        surfaceTempSerie[i] = {};
        surfaceWindSpeed[i] = {};
        surfaceWaveHeight[i] = {};
        surfaceAirTemp[i] = {};

        surfaceTempSerie[i].data = [];
        surfaceWindSpeed[i].data = [];
        surfaceWaveHeight[i].data = [];
        surfaceAirTemp[i].data = [];

        surfaceTempSerie[i].name = steps[i].name;
        surfaceWindSpeed[i].name = steps[i].name;
        surfaceWaveHeight[i].name = steps[i].name;
        surfaceAirTemp[i].name = steps[i].name;

        for(var j = 0; j < steps[i].days.length; j++) {
            //surfaceTempSerie[i].data.push(steps[i].days[j].sea_surface_temperature);
            //surfaceWindSpeed[i].data.push(steps[i].days[j].wind_speed);
            
            surfaceTempSerie[i].data.push(checkData(i, j, steps[i].station, "sea_surface_temperature"));
            surfaceWindSpeed[i].data.push(checkData(i, j, steps[i].station, "wind_speed"));
            
            surfaceWaveHeight[i].data.push(stations[steps[i].station].day[j].wave_height);
            surfaceAirTemp[i].data.push(stations[steps[i].station].day[j].air_temperature);
        }
    }
    
    displayGraph(surfaceTempSerie, surfaceWindSpeed, surfaceWaveHeight, surfaceAirTemp);
}

function checkData(idStep, day, stationName, dataName) {
    
    switch (dataName) {
        case 'sea_surface_temperature' :
                if (steps[idStep].days[day].sea_surface_temperature === null) {
                    if (stations[stationName].day[day].sea_surface_temperature !== null && stations[stationName].day[day].sea_surface_temperature != 0) {
                        return stations[stationName].day[day].sea_surface_temperature;
                    }
                }
                
                return steps[idStep].days[day].sea_surface_temperature;
            break;
        case 'wind_speed':
                if (steps[idStep].days[day].wind_speed === null) {
                    if (stations[stationName].day[day].wind_spd !== null && stations[stationName].day[day].wind_spd != 0) {
                        return stations[stationName].day[day].wind_spd;
                    }
                }
        
                return steps[idStep].days[day].wind_speed;
            break;
        default:
                return null;
            break;
    }
}

$(function () {
    //console.log(steps);
    //console.log(stations);

    allGraph();
    $("select").change(function(){
        var graphType = $("select option:selected").val();
        console.log(graphType);
    });
    $("#display_all_steps").on("click", function(){
         $("#one_step").hide();
         
         allGraph();
    });
});