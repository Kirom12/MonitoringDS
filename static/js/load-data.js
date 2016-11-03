var API_KEY = "b76c6e74ebc74b86b5fab4d00f6f6180";

$(function() {
    
    // Get stations from 
    $.ajax({
        //url: "http://api.planetos.com/v1/datasets/noaa_ndbc_stdmet_stations/stations?apikey="+API_KEY,
        url: "library/tmp/list-stations.json",
        type: "GET",
        dataType: "json",
        success: function(data){
            var stations = data.station;
            //Set a defaut high distance
            var stationsDiff = 100000;
            var distanceBetween;
            var tmp = {};
            
            for (var i = 0; i < steps.length; i++) {
                
                //Find the nearest station
                for (var station in stations) {
                    //Distance between the point and current station
                    distanceBetween = getDistanceFromLatLonInKm(
                        stations[station].SpatialExtent.coordinates[1],
                        stations[station].SpatialExtent.coordinates[0],
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
                
                var k = 0;            
                $.ajax({
                    //url: "http://api.planetos.com/v1/datasets/myocean_sst_europe_daily/point?lon="+stepCoordonates[i].long+"&lat="+stepCoordonates[i].lat+"&apikey="+API_KEY+"&var=sea_surface_temperature,wind_speed&count=7",
                    url: "library/tmp/data-step1.json",
                    type: "GET",
                    dataType: "json",
                    success: function(data){       
                        //console.log(data);
                    
                        steps[k].days = [];
                        
                        for(var j = 0; j < 7; j++) {
                            tmp.sea_surf_temp = data.entries[j].data.sea_surface_temperature;
                            tmp.wind_speed = data.entries[j].data.wind_speed;
                            
                            console.log(data.entries[j].data.sea_surface_temperature);
                            console.log(data.entries[j].data.wind_speed);
                            
                            //console.log(j);
                            console.log(tmp);
                            
                            steps[k].days[j] = tmp;
                        }      
                        //console.log(steps[k]);
                        
                        //console.log(k);
                        
                        k++;
                    },
                    error: function() {
                        console.log("Error on ajax data query");
                    }
                });
                
                k = 0;
                
                $.ajax({
                   // url: "http://api.planetos.com/v1/datasets/noaa_ndbc_stdmet_stations/stations/"+stepCoordonates[i].station+"?origin=dataset-details&apikey="+API_KEY+"&var=air_temperature,wave_height&time_order=desc",
                    url: "library/tmp/list-stations.json",
                    type: "GET",
                    dataType: "json",
                    success: function(data){
                        //console.log(data);
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