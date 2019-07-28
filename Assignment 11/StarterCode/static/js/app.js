// from data.js
var tableData = data;

var submit = d3.select("#filter-btn")

var tbody = d3.select("tbody");

submit.on("click", function() {

	d3.event.preventDefault();

	tbody.html("")

	var inputDate = d3.select("datetime");

	var inputValue = inputDate.property('value');
	var filteredData = tableData.filter(function(sight) {

		if (sight.datetime === inputValue){

			console.log(filteredData);
			var row =tbody.append("tr");

			Object.entries(sight).forEach(function([key, value]) {

				var cell = tbody.append("td");

					cell.text(value);
					});
			  });

		});
 });	

