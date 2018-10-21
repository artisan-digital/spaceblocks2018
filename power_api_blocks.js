
 new (function() {
    var ext = this;
     // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
     // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
     
	ext.get_temp = function(lat, lon, date, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?request=execute&identifier=SinglePoint&parameters=T2M&startDate='+date+'&endDate='+date+'&userCommunity=SSE&tempAverage=DAILY&outputList=JSON,ASCII&lat='+lat+'&lon='+lon+'&user=anonymous',
              dataType: 'json',
              success: function( data ) {
		          features = data["features"];
		          console.log(features[0]);
		          console.log(features[0].properties);
            	properties = features[0].properties;
            	parameter = properties["parameter"];
		          temps = parameter["T2M"];
              temperature = temps[date];
              callback(temperature);
              }
        });
    };
	 
	ext.get_prec = function(lat, lon, date, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?request=execute&identifier=SinglePoint&parameters=PRECTOT&startDate='+date+'&endDate='+date+'&userCommunity=SSE&tempAverage=DAILY&outputList=JSON,ASCII&lat='+lat+'&lon='+lon+'&user=anonymous',
              dataType: 'json',
              success: function( data ) {
		          features = data["features"];
		          console.log(features[0]);
		          console.log(features[0].properties);
            	properties = features[0].properties;
            	parameter = properties["parameter"];
		          prec = parameter["PRECTOT"];
              precipitation = prec[date];
              callback(precipitation);
              }
        });
    };
	 
     // Block and block menu descriptions
    var descriptor = {
        blocks: [
 		['R', 'temperature at lat: %d long: %d on date (YYYYMMDD) : %s', 'get_temp', 36, 45, 20160301],
		['R', 'precipitation at lat: %d long: %d on date (YYYYMMDD) : %s', 'get_prec', 36, 45, 20160301],
		
        ],
	    menus: {
			dataset: ["Precipitation", "Tempurature", "Humidity"]
		}
    };
     // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
