$(document).ready(function() {

	$.ajax({
		//url: 'http://api.planetos.com/v1/datasets?apikey=019ecd71188a4982a20e1a9717e1ab27',
		url: 'http://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point?lon=2.490000009536743&lat=51.69647163658455&apikey=019ecd71188a4982a20e1a9717e1ab27',
		type: 'GET',
		dataType: 'json',
		success : function(data){ // code_html contient le HTML renvoyé

			var listStation = data["entries"][0]["data"];
						console.log(listStation);
			//for (var i = 1; i < listStation.length; i++)
			//{
				var Wind_speed_surface = listStation["Wind_speed_surface"];
				var Wind_direction_from_which_blowing_surface = listStation["Wind_direction_from_which_blowing_surface"];
				var vcomponent_of_wind_surface = listStation["v-component_of_wind_surface"];
				var ucomponent_of_wind_surface = listStation["u-component_of_wind_surface"];
				var Direction_of_wind_waves_surface = listStation["Direction_of_wind_waves_surface"];
				var Primary_wave_mean_period_surface = listStation["Primary_wave_mean_period_surface"];
				var Primary_wave_direction_surface = listStation["Primary_wave_direction_surface"];
				var Significant_height_of_wind_waves_surface = listStation["Significant_height_of_wind_waves_surface"];
				var Mean_period_of_wind_waves_surface = listStation["Mean_period_of_wind_waves_surface"];
				var Secondary_wave_mean_period_surface = listStation["Secondary_wave_mean_period_surface"];
				var Significant_height_of_combined_wind_waves_and_swell_surface = listStation["Significant_height_of_combined_wind_waves_and_swell_surface"];
				var Secondary_wave_direction_surface = listStation["Secondary_wave_direction_surface"];

				$(".planet").append(
						"<li>"+
						Wind_speed_surface+
						"</li>"+
						"<li>"+
						Wind_direction_from_which_blowing_surface+
						"</li>"+
						"<li>"+
						vcomponent_of_wind_surface+
						"</li>"+
						"<li>"+
						ucomponent_of_wind_surface+
						"</li>"+
						"<li>"+
						Direction_of_wind_waves_surface+
						"</li>"+
						"<li>"+
						Primary_wave_mean_period_surface+
						"</li>"+
						"<li>"+
						Primary_wave_direction_surface+
						"</li>"+
						"<li>"+
						Significant_height_of_wind_waves_surface+
						"</li>"+
						"<li>"+
						Mean_period_of_wind_waves_surface+
						"</li>"+
						"<li>"+
						Secondary_wave_mean_period_surface+
						"</li>"+
						"<li>"+
						Significant_height_of_combined_wind_waves_and_swell_surface+
						"</li>"+
						"<li>"+
						Secondary_wave_direction_surface+
						"</li>"
						)
			//};
		}
	})
});


//http://api.planetos.com/v1/datasets/{id}/point?lon={longitude}&lat={latitude}apikey={apikey}
//
//
//2.490000009536743,51.69647163658455,0.0
//
//
//http://api.planetos.com/v1/datasets/{id}/point?lon=2.490000009536743&lat=51.69647163658455apikey=019ecd71188a4982a20e1a9717e1ab27
//
//
// ["nasa_3imerghh", "gpcc_first_guess_daily", "copernicus_goba_global_weekly", "nasa_oscar_global_5day", "pacioos_swan_oahu", "noaa_ww3_hurricane_ep", 
// "noaa_ww3_hurricane_at", "metno_harmonie_metcoop", "noaa_ww3_at", "noaa_ndbc_cwind_stations", "nasa_gldas_lwc_monthly", "nasa_grctellus_ocean", 
// "noaa_ww3_ak", "nasa_ghrsst_global_daily", "myocean_sst_europe_daily", "noaa_nam_hawaii", "cmems_baltic_observations_daily", 
// "noaa_wpc_qpf_1_7_days_6hr", "nasa_3imerghhl", "noaa_ndbc_swden_stations", "bom_access-g_global_40km", "noaa_etopo_global_1arcmin", 
// "noaa_icoads_enhanced_1d_day", "nasa_grctellus_land", "noaa_ndbc_stdmet_stations", "noaa_blended_sea_winds_6hr_global_0.25d", "noaa-ncep_gefs", 
// "myocean_sst_baltic_daily", "noaa_nam_prico", "copernicus_biogeo_baltic_hourly", "noaa_nam_north_pacific", "noaa_nam_alaska", "noaa_ww3_nph", 
// "noaa_nam_awips_phys", "noaa_aqfs_pm25_bc_conus", "noaa_ww3_global_1.25x1d", "noaa_ww3_ao", "noaa_ww3_wc", "noaa_gfs_global_sflux_0.12d", 
// "rss_ccmp_winds_v2", "noaa_co2_obs_weekly", "socib_forecast_western_mediterranean_daily", "noaa_aqfs_avg_1h_o3_conus", "nasa_3imerghhe", 
// "noaa_nam_ca", "noaa_ndbc_adcp_station", "noaa_ww3_nah", "cmems_gwind", "metoffice_glosea5_global_daily", 
// "unstable%3A_._._._%24%2F...oop_default___km____.nc", "hycom_glbu0.08_91.2_global_0.08d", "noaa_ww3_hurricane_ak", 
// "noaa_nam_awips_12", "noaa_ww3_hurricane_wc", "noaa_ww3_ep", "noaa_hrrr_surface_hourly", "socib_hfradar_ibiza_hourly", 
// "noaa_rtofs_surface_1h_diag"]
// 
// 
// 
// http://api.planetos.com/v1/datasets/noaa_ww3_global_1.25x1d/point
// 
// 
// 
// 
 /*     "Wind_speed_surface": 9.789999961853027,
      "Wind_direction_from_which_blowing_surface": 309.760009765625,
      "v-component_of_wind_surface": -6.260000228881836,
      "u-component_of_wind_surface": 7.53000020980835,
      "Direction_of_wind_waves_surface": 338.8900146484375,
      "Primary_wave_mean_period_surface": 6.110000133514404,
      "Primary_wave_direction_surface": 355.5899963378906,
      "Significant_height_of_wind_waves_surface": 1.5099999904632568,
      "Mean_period_of_wind_waves_surface": 5.090000152587891,
      "Secondary_wave_mean_period_surface": 6.139999866485596,
      "Significant_height_of_combined_wind_waves_and_swell_surface": 1.5,
      "Secondary_wave_direction_surface": 338.8900146484375*/

/*	"Wind_direction_from_which_blowing_surface": 309.760009765625,
      "v-component_of_wind_surface": -6.260000228881836,
      "u-component_of_wind_surface": 7.53000020980835,
      "Direction_of_wind_waves_surface": 338.8900146484375,
      "Primary_wave_mean_period_surface": 6.110000133514404,
      "Primary_wave_direction_surface": 355.5899963378906,
      "Significant_height_of_wind_waves_surface": 1.5099999904632568,
      "Mean_period_of_wind_waves_surface": 5.090000152587891,
      "Secondary_wave_mean_period_surface": 6.139999866485596,
      "Significant_height_of_combined_wind_waves_and_swell_surface": 1.5,
      "Secondary_wave_direction_surface": 338.8900146484375*/