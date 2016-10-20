(function(albviz) {
    'use strict';

    var chartContainer = d3.select('#genre-bar');

    var margin = {top:20, right:20, bottom: 35, left:40};
    var boundingRectangle = chartContainer.node().getBoundingClientRect();
    var width = boundingRectangle.width - margin.left - margin.right,
    height = boundingRectangle.height - margin.top - margin.bottom;
    var xPaddingLeft = 20;

    // Chart Scales
    var xScale = d3.scale.ordinal()
        .rangeBands([xPaddingLeft, width], 0.1);

    var yScale = d3.scale.linear()
        .range([height, 0]);

    // Chart Axes
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(10)
        .tickFormat(function(d) {
            return d;
    });


    // append the SVG to the chart container
    var svg = chartContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // The <g> SVG element is a container used to group other SVG elements.
        .append("g")
        // The SVG Transform Attribute applies a list of transformations to an element and it's children.
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add Axes
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .attr("id", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        // dy is a relative coordinat to the y coordinate specified above
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    //Chart update pattern
    albviz.updateGenreBarChart = function(data) {
        data = data.filter(function(d) {
            return d.value > 0;
        });
        console.log(data);

        xScale.domain(data.map(function(d) { return d.key; }));
        yScale.domain([0, d3.max(data, function(d) { return +d.value;})]);

        svg.select('.x.axis')
            // .transition().duration(albviz.TRANS_DURATION)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            // rotate the axis labels to create spacing
            .attr("transform", function(d) {
                return "rotate(-65)";
            });

        svg.select('.y.axis')
            .transition().duration(albviz.TRANS_DURATION)
            .call(yAxis);

        var yLabel = svg.select('#y-axis-label');
        yLabel.text("Albums per Genre");

        var bars = svg.selectAll(".bar")
            .data(data, function(d) {
                return d.key;
            });

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("x", xPaddingLeft);

        bars
            .classed('active', function(d) {
                return d.key === albviz.activeGenre;
            })
            .transition().duration(albviz.TRANS_DURATION)
            .attr("x", function(d) {
                return xScale(d.value); 
            })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) {
                return yScale(d.value);
            })
            .attr("height", function(d) {
                return height -yScale(d.value);
            });

        bars.exit().remove();
    };    

}(window.albviz = window.albviz || {}));