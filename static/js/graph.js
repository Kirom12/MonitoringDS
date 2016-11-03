$(function () {
    console.log(steps);
    console.log(stations);

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
            surfaceTempSerie[i].data.push(steps[i].days[j].sea_surface_temperature);
            surfaceWindSpeed[i].data.push(steps[i].days[j].wind_speed);
            surfaceWaveHeight[i].data.push(stations[steps[i].station].day[j].wave_height);
            surfaceAirTemp[i].data.push(stations[steps[i].station].day[j].air_temperature);
        }
    }

    Highcharts.chart('sea_surface_temperature', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Surface Temperature'
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
            text: 'Surface Air Temperature'
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

    $('#windspeed').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Wind speed during two days'
        },
        subtitle: {
            text: 'May 31 and and June 1, 2015 at two locations in Vik i Sogn, Norway'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                overflow: 'justify'
            }
        },
        yAxis: {
            title: {
                text: 'Wind speed (m/s)'
            },
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [{ // Light air
                from: 0.3,
                to: 1.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Light air',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Light breeze
                from: 1.5,
                to: 3.3,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Light breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Gentle breeze
                from: 3.3,
                to: 5.5,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Gentle breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Moderate breeze
                from: 5.5,
                to: 8,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Moderate breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Fresh breeze
                from: 8,
                to: 11,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Fresh breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 11,
                to: 14,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Strong breeze',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // High wind
                from: 14,
                to: 15,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'High wind',
                    style: {
                        color: '#606060'
                    }
                }
            }]
        },
        tooltip: {
            valueSuffix: ' m/s'
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 3600000, // one hour
                pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
            }
        },
        series: [{
            name: '1',
            data: [0.2, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6]

        }, {
            name: '2',
            data: [0, 0, 0.6, 0.9, 0.8, 0.2, 0, 0, 0, 0.1, 0.6, 0.7, 0.8, 0.6, 0.2, 0, 0.1, 0.3, 0.3, 0, 0.1, 0, 0, 0, 0.2, 0.1, 0, 0.3, 0, 0.1, 0.2, 0.1, 0.3, 0.3, 0, 3.1, 3.1, 2.5, 1.5, 1.9, 2.1, 1, 2.3, 1.9, 1.2, 0.7, 1.3, 0.4, 0.3]
        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
});