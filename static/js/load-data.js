//Load data from planetos api and save it in webstorage

$(function() { 
    if (loadFromCache) {
        console.log('load from cache');
        return;
    } else {
        console.log('load from API');
    }

    // Get stations from 
    $.ajax({
        url: "http://api.planetos.com/v1/datasets/noaa_ndbc_stdmet_stations/stations?apikey="+API_KEY,
        //url: "library/tmp/list-stations.json",
        type: "GET",
        dataType: "json",
        success: function(data){
            var stationsList = data.station;
            date = new Date();

            //Set a defaut high distance
            var stationsDiff = 100000;
            var distanceBetween;

            //Use for the station data
            var hours = 15;
            var countDataStation = hours+(24*(DAYS-1));
            var k = 0;

            for (var i = 0; i < steps.length; i++) {
                
                //Find the nearest station
                for (var station in stationsList) {
                    //Distance between the point and current station
                    distanceBetween = getDistanceFromLatLonInKm(
                        stationsList[station].SpatialExtent.coordinates[1],
                        stationsList[station].SpatialExtent.coordinates[0],
                        steps[i].lat,
                        steps[i].long
                    );
                    
                    if (distanceBetween < stationsDiff) {
                        stationsDiff = distanceBetween;                   
                        steps[i].station = station;            
                        //console.log(stationsDiff);
                    }
                }            
                //Reset distance
                stationsDiff = 100000;

                //Save station for querying
                if(stations[steps[i].station] == null) {
                    stations[steps[i].station] = {};
                }
             
                // Get temperature and wind with coordonates         
                $.ajax({
                    url: "http://api.planetos.com/v1/datasets/myocean_sst_europe_daily/point?lon="+steps[i].long+"&lat="+steps[i].lat+"&apikey="+API_KEY+"&var=sea_surface_temperature,wind_speed&count=7",
                    //url: "library/tmp/data-step1.json",
                    type: "GET",
                    dataType: "json",
                    success: function(data){       
                        //console.log(data);   
                        steps[k].days = [];
                        
                        //Save data for each day
                        for(var j = 0; j < DAYS; j++) {
                            steps[k].days[j] = {};
                            steps[k].days[j].sea_surface_temperature = (data.entries[j].data.sea_surface_temperature === null)? null : roundNb(data.entries[j].data.sea_surface_temperature - 273.15); //Convert kelvin to celsius
                            steps[k].days[j].wind_speed = roundNb(data.entries[j].data.wind_speed);
                        }

                        //Save datas in local storage
                        localStorage.setItem("MonitoringDS-steps", JSON.stringify(steps));
                        localStorage.setItem("MonitoringDS-cache", date.getTime());

                        k++;
                    },
                    error: function() {
                        console.log("Error on ajax data query");
                    }
                });
            }

            //Get air temperature and wave height from a station
            for (var station in stations) {
                $.ajax({
                    url: "http://api.planetos.com/v1/datasets/noaa_ndbc_stdmet_stations/stations/"+station+"?origin=dataset-details&apikey="+API_KEY+"&var=air_temperature,wave_height,sea_surface_temperature,wind_spd&time_order=desc&count="+countDataStation,
                    //url: "library/tmp/data-stations.json",
                    type: "GET",
                    dataType: "json",
                    success: function(data){
                        //TODO: test if data exist !
                        var countData = 0;
                        var offsetData = hours;
                        var temp = 0, height = 0, seaTemp = 0, wind = 0;
                        var currentStation = data.entries[0].classifiers.station;

                        stations[currentStation].day = [];

                        for(var j = 0; j < DAYS; j++) {
                            //Get average of all statement for one day
                            for(var m = countData; m < offsetData; m++) {
                                temp += data.entries[m].data.air_temperature;
                                height += data.entries[m].data.wave_height;
                                seaTemp += data.entries[m].data.sea_surface_temperature;
                                wind += data.entries[m].data.wind_spd;
                            }

                            //Save data in stations object
                            stations[currentStation].day[j] = {};
                            stations[currentStation].day[j].air_temperature = roundNb(temp/(offsetData-countData));
                            stations[currentStation].day[j].wave_height = roundNb(height/(offsetData-countData));
                            stations[currentStation].day[j].sea_surface_temperature = roundNb(seaTemp/(offsetData-countData));
                            stations[currentStation].day[j].wind_spd = roundNb(wind/(offsetData-countData));
                            
                            temp = 0, height = 0, seaTemp = 0, wind = 0;
                            countData = offsetData;
                            offsetData = offsetData+24;
                        }

                        //Save datas in local storage
                        localStorage.setItem("MonitoringDS-stations", JSON.stringify(stations));
                    },
                    error: function() {
                        console.log("Error on ajax station data query");
                    }
                });
            }    
        },
        error: function() {
            console.log("Error on ajax stations query");
        }
    });
});

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

/*
 *  Round a number
 *
 *  @param Float value number to round
 *  @param Int decimals
 *  @return float
 */
function roundNb(value, decimals) {
    if (value === null) {return null;}
    var decimals = (typeof decimals !== 'undefined') ? decimals : 2;

    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}