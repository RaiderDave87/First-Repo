
var myMap = L.map("map", {
		center: [37.090240, -95.712891],
		zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
	attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
	maxZoom: 18,
	id: "mapbox.streets-basic",
	accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

d3.json(url, function(response) {

		var features = response.features;

		for (var i = 0; i < features.length; i++) {
		var geometry = features[i].geometry;

				var color = "";
				var mag = features[i].properties.mag;

				if (mag <=0) {
				color = "#7cff00";
				}
				else if (mag > 0 && mag <= 1) {
				color = "#7cff00";
				}
				else if (mag > 1 && mag <= 2) {
				color = "#d8ff00";
		}
		else if (mag > 2 && mag <= 3) {
			color = "#ffff00";
		}
        else if (mag > 3 && mag <= 4) {
        	color = "#ffcd00";
        }
        else if (mag > 4 && mag <= 5) {
        	color = "#ffa600";
        }
        else if (mag > 5) {
        	color = "#ff0000";
        }

        	L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
        		fillOpacity: 0.75, 
        		color: color,
        		fillColor: color,

        		radius: mag * 20000
        	    }).bindPopup("<h2>" + features[i].properties.place + "</h2> <hr> <h3>" + mag + "Richter</h3>").addTo(myMap);

     }
        
     var legend = L.control({ position: "bottomright" });
     legend.onAdd = function() {
       	var div = L.DomUtil.create("div", "info legend");
       	var grades = [0,1,2,3,4,5]
       	var colors = ["#7cff00", "#d8ff00", "#ff0000", "#ffa600", "#ff0000"]

       		for (var i = 0; i < grades.length; i++) {
       				div.innerHTML += '<i style="background:' + 
       				colors [i] +
       				'"></i>' +
       				grades[i] + (grades[i + 1]? '&ndash;' + grades[i + 1] + '<br>' : '+');
       		}
       		return div;
            };

     legend.addTo(myMap);


});

