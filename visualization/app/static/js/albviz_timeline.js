(function(albviz) {
    'use strict';

    var chartContainer = d3.select('#album-timeline');

    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var boundingRectangle = chartContainer.node().getBoundingClientRect();
    var width = boundingRectangle.width - margin.left - margin.right,
        height = boundingRectangle.height - margin.top - margin.bottom;

    var svg = chartContainer.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('class', 'chart')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Chart Scales
    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1)
        .domain(d3.range(1970, 2016));

    var yScale = d3.scale.ordinal()
        .rangeRoundPoints([height,0])
        .domain(d3.range(5));

    // Chart X-Axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickValues(xScale.domain().filter(function(d, i) {
            // return true for years ending in zero
            // places a tick lable at the start of each decade
            return !(d%10);
        }));

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end') 
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)');

    // Chart Labels
    var categoryLabels = chartContainer.select('svg').append('g')
        .attr('class', 'labels')
        .attr('transform', 'translate(10,10)')
        .selectAll('label').data(albviz.CATEGORIES)
        .enter().append('g')
        .attr('transform', function(d,i) {
            // creates a group for each category spaced 10 pixels apart
            return 'translate(0,' + i * 20 + ')';
        });

    categoryLabels.append('circle')
        .attr('fill', (albviz.categoryFill))
        // makes the label circles the same size
        // as those on the timeline
        .attr('r', xScale.rangeBand()/2);

    categoryLabels.append('text')
        .text(function(d) {
            return d;
        })
        .attr('dy', '0.4em')
        .attr('x', 10);

    // Chart update pattern
    albviz.updateTimeChart = function(data) {
        console.log(data);
        var years = svg.selectAll('.year')
            .data(data, function(d) {
                // joins the year data to its column by year key
                // not the default array index
                return d.key;
            });

        years.enter().append('g')
            .classed('year', true)
            .attr('name', function(d) { return d.key;})
            .attr("transform", function(year) {
                return "translate(" + xScale(+year.key) + ",0)";
            });
    
        years.exit().remove();

        var albums = years.selectAll('.album')
            .data(function(d) {
                return d.values;
            }, function(d) {
                return d.album_x;
            });

        albums.enter().append('circle')
            .classed('album', true)
            .attr('fill', function(d) {
                return albviz.categoryFill(d.category);
            })
            .attr('cy', height)
            .attr('cx', xScale.rangeBand()/2)
            .attr('r', xScale.rangeBand()/2);

        albums
            .transition().duration(albviz.TRANS_DURATION)
            .attr('cy', function(d, i) {
                return yScale(i);
            });

        albums.exit().remove();
    };

}(window.albviz = window.albviz || {}));