// @TODO: YOUR CODE HERE!

const svgWidth = 960;
const svgHeight = 500;


const margin = {
	top: 25,
	right: 50,
	bottom: 120,
	left: 190
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const svg = d3
		.select("#scatter")
		.append("svg")
		.attr("width", svgWidth)
		.attr("height", svgHeight);

const chartGroup = svg.append("g")
		.attr("transform", `translate(${margin.left}, (${margin.top})`);

let chosenXAxis = "poverty"
let chosenYAxis = "healthcare";

function xScale(usa_data, chosenXAxis) {

	var xLinearScale = d3.scaleLinear()
      .domain([d3.min(usa_data, d => d[chosenXAxis]) * 0.9,
        d3.max(usa_data, d => d[chosenXAxis]) * 1.0
        ])
      	.range([0, width])
      return xLinearScale;
     }

     function yScale(usa_data, chosenYAxis) {

     	var yLinearScale = d3.scaleLinear()
     	  .domain([0,d3.max(usa_data, d => d[chosenYAxis]) * 1.2])
     	  .range([height, 0]);
        return yLinearScale;
     }

     function renderXAxis(newXScale, xAxis) {

     	var bottomAxis = d3.axisBottom(newXScale);

     	xAxis.transition()
     		.duration(1000)
     		.call(bottomAxis);

     		return xAxis;
     }
	
	function renderYAxis(newYScale, yAxis) {

		var leftAxis = d3.axisLeft(newYScale);

		yAxis.transition()
			.duration(1000)
			.call(leftAxis);

			return yAxis;
		}

		function renderXcircles(circlesGroup, newXScale, chosenXAxis) {

			circlesGroup.transition()
			.duration(1000)
			.attr("cx", d => newXScale(d[chosenXAxis]))
		return circlesGroup;
	}

		function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

			circlesGroup.transtion()
			.duration(1000)
			.attr("cy", d => newYScale(d[chosenYAxis]));
		return circlesGroup;
	}

		function renderXTexts(textsGroup, newXScale, chosenXAxis) {

			textsGroup.transition()
				.duration(1000)
				.attr("x", d => newXScale(d)[chosenXAxis]));
		return textsGroup;
	}
 				
		function renderYTexts(textsGroup, newYScale, chosenYAxis) {

			textsGroup.transition()
			  .duration(1000)
			  .attr("y", d => newYScale(d[chosenYAxis]));
			return textsGroup;
	}

	function updateXToolTip(chosenXAxis, circlesGroup) {

		if (chosenXAxis === "poverty") {
			var label = "Poverty (%):";
		}
  		else if (chosenXAxis === "age") {
  			var label = "Age:";
  		}
  		else if (chosenXAxis === "income") {
  			var label = "Household Income:";
  		}
			 			
	    var chosenYAxis = d3.select(".ylabel").select(".active").attr("value");

	    if (chosenYAxis === "healthcare") {
	    	var ylabel = "Lacks Healthcare(%):"; 
	    }
	    else if (chosenYAxis === "obesity") {
	    	var yLabel = "Obesity (%):";
	    }
	    else if (chosenYAxis === "smokes") {
	    	var yLabel = "Smokes (%):";
	    }

	    const toolTip = d3.tip()
	    	.attr("class", "tooltip")
	    	.offset([80, -60])
	    	.html(function(d) {
	    		return (`${d.abbr}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
	    	});


	    circlesGroup.call(toolTip);

	    circlesGroup.on("mouseover", toolTip.show)
	    	.on("mouseout", toolTip.hide);
	    return circlesGroup;
	 }

	 function updateYTooltip(chosenYAxis, circlesGroup) {
	 	console.log('in updateYTooltip')
	 	if (chosenYAxis == "healthcare") {
	 	  var yLabel = "Lacks Healthcare (%):";
	 	}
	 	else if (chosenYAxis === "obesity") {
	 	  var yLabel = "Obesity (%):";
        }
        else if (chosenYAxis === "smokes") {
          var yLabel = "Smokes (%):";
        }
	 
	    var chosenXAxis = d3.select(".xLabel").select(".active").attr("value");

	    console.log(`ylabel`, yLabel)
	    console.log(`chosen x axis`, chosenXAxis)
	    console.log(`chosen y axis`, chosenYAxis)

	    if (chosenXAxis === "poverty") {
	        var label = "Poverty (%):";
	    }
	    else if (chosenXAxis === "age") {
	    	var label = "Age: ";
	    }
	    else if (chosenXAxis === "income") {
	    	var label = "Household Income:";
	    }

	    var toolTip = d3.tip()
	       .attr("class", "tooltip")
	       .offset([80, -60])
	       .html(function(d) {
	       	   return (`${d.abbr}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenXAxis]}`);
	       });

	    circlesGroup.call(toolTip);

	    circlesGroup.on("mouseover", toolTip.show)
	    .on("mouseout", toolTip.hide);

	    return circlesGroup;

	  }

      d3.csv("assests/data/data.csv").then((usa_data,err) => {

      	if (err) throw err;
        
        usa_data.forEach(function(data) {
          data.poverty = +data.poverty;
          data.age = +data.age;
          data.income = +data.income;
          data.healthcare = +data.obesity;
          data.smokes = +data.smokes;
      	});

      	var xLinearScale = d3.axisBottom(xLinearScale);

      	var yLinearScale = d3.scaleLinear()
      		.domain([0, d3.max(usa_data, d => d.healthcare)])
      		.range([height, 0]);

      	var bottomAxis = d3.axisBottom(xLinearScale);
      	var leftAxis = d3.axisLeft(yLinearScale);

      	var xAxis = chartGroup.append("g")
      		.classed("x-axis", true)
      		.attr("transform", `translate(0, ${height})`)
      		.call(bottomAxis);

      	var yAxis = chartGroup.append("g")
      		.classed("y-axis", true)
      		.call(leftAxis);

      	var circlesGroup = chartGroup.selectAll("circle")
      		.data(usa_data)
      		.enter()
      		.append("circle")
      		.attr("cx", d => xLinearScale(d[chosenXAxis]))
      		.attr("cy", d => yLinearScale(d[chosenYAxis]))
      		.attr("r", 20)
      		.attr("fill", "blue")
      		.attr("opacity", ".5");

      	var textsGroup = chartGroup.append("text")
      		.selectAll("tspan")
      		.data(usa_data)
      		.enter()
      		.append("tspan")
      		.text(d => d.abbr)

      		.attr("x", d => xLinearScale(d[chosenXAxis]))
      		.attr("y", d => yLinearScale(d[chosenYAxis]))
      		.attr("fill", "white")
      		.attr("font-size", 8)
      		.attr("class", "stateText");

      	if (svgWidth < 500) {
      		circlesGroup.attr("r", 5);
      		textsGroup.style("display", "none");
      	}
      	else {
      		circlesGroup.attr("r", 12);
      		textsGroup.style("display", "inline");
      	}

      	var labelsGroup = chartGroup.append("g")
      		.attr("transform", `translate(${width / 2} ${height + 20})`)
      		.classed("xlabel", true);

      	var poverty = labelsGroup.append("text")
      		.attr("x", 0)
      		.attr("y", 20)
      		.attr("value", "poverty")
      		.classed("active", true)
      		.text("In Poverty(%)");

      	var age = labelsGroup.append("text")
      		.attr("x", 0)
      		.attr("y", 40)
      		.attr("value", "age")
      		.classed("inactive", true)
      		.text("Age Median");

      	var income = labelsGroup.append("text")
      		.attr("x", 0)
      		.attr("y", 60)
      		.attr("value", "income")
      		.classed("inactive", true)
      		.text("Household Income Median");

      	var ylabelsGroup = chartGroup.append("g")
      		.attr("transform", "rotate(-90)")
      		.classed("yLabel", true);

      	var healthcare = ylabelsGroup.append("text")
      		.attr("y", 0 - 50)
      		.attr("x", 0 - (height / 2) )
      		.attr("dy", "1em")
      		.attr("value", "healthcare")
      		.classed("active", true)
      		.text("Lacks Healthcare (%)");

      	var smokes = ylabelsGroup.append("text")
      		.attr("y", 0 - 85)
      		.attr("x", 0 - (height / 2) )
      		.attr("value", "smokes")
      		.attr("dy", "2em")
      		.attr("value", "healthcare")
      		.classed("inactive", true)
      		.text("Smokes (%)");

      	var obese = ylabelsGroup.append("text")
      		.attr("y", 0 - 120)
      		.attr("x", 0 - (height / 2) )
      		.attr("value", "obesity")
      		.attr("dy", "3em")
      		.classed("inactive", true)
      		.text("Obesity (%)");

      	labelsGroup.selectAll("text")
      		.on("click", function() {

      			var value = d3.select(this).attr("value");
      			if (value !== chosenXAxis) {

      				chosenXAxis = value;

      				xLinearScale = xScale(usa_data, chosenXAxis);

      				xAxis = renderXAxis(xLinearScale, xAxis);

      				circlesGroup = renderXTexts(textsGroup, xLinearScale, chosenXAxis);

      				textsGroup = renderXTexts(textsGroup, xLinearScale, chosenXAxis);

      				circlesGroup = updateXToolTip(chosenXAxis, circlesGroup);

      				if (chosenXAxis === "poverty") {
      					poverty
      					  .classed("active", true)
      					  .classed("inactive", false);
      					age
                          .classed("active", false)
      					  .classed("inactive", true);
      					income
      					  .classed("active", false)
      					  .classed("inactive", true):
      				}
      				else if (chosenXAxis === "age" {
                        poverty
                       	  .classed("active", false)
      					  .classed("inactive", true);
      					age
                          .classed("active", true)
      					  .classed("inactive", false);
      					income
      					  .classed("active", false)
      					  .classed("inactive", true);
      			    }
                    else if (chosenXAxis === "income") {
                        poverty
                       	  .classed("active", false)
      					  .classed("inactive", true);
      					age
                          .classed("active", true)
      					  .classed("inactive", false);
      					income
      					  .classed("active", false)
      					  .classed("inactive", true);
      			    }
      			  }
                });

      	     ylabelsGroup.selectAll("text")
      		.on("click", function() {

      			var value = d3.select(this).attr("value");
      			console.log(`value in yaxis label`, value)

      			if (value !== chosenXAxis) {

      		      chosenYAxis = value;

      		      yLinearScale = yScale(usa_data, chosenYAxis);
      		      conole.log(`ylinear`, yLinearScale)

      		      yAxis = renderYAxis(yLinearScale, yAxis);
      		      console.log(`yAxis`, yAxis)

      		      circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

      		      textsGroup = renderYTexts(textsGroup, yLinearScale, chosenYAxis);

      		      circlesGroup = updateYTooltip(chosenYAxis, circlesGroup);

      		      if (chosenYAxis === "healthcare") {
      		      	healthcare
      		      	  .classed("active", true)
      		      	  .classed("inactive", false);
      		      	smokes
      		      	  .classed("active", false)
      		      	  .classed("inactive", true);
      		        obesity
      		      	  .classed("active", false)
      		      	  .classed("inactive", true);
      		      }
      			  else if (chosenYAxis === "smokes") {
      			  	healthcare
      		      	  .classed("active", false)
      		      	  .classed("inactive", true);
      		      	smokes
      		      	  .classed("active", true)
      		      	  .classed("inactive", false);
      		        obesity
      		      	  .classed("active", false)
      		      	  .classed("inactive", true);
      			  } 
                  else if(chosenYAxis === "obese") {
                    healthcare
      		      	  .classed("active", false)
      		      	  .classed("inactive", true);
      		      	smokes
      		      	  .classed("active", false)
      		      	  .classed("inactive", true);
      		        obesity
      		      	  .classed("active", true)
      		      	  .classed("inactive", false);
                  }
                 }
             });
      	   });


      			    
      					 

      		











