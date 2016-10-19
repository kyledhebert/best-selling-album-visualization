(function(albviz) {
    'use strict';

    // Category Selector
    var categoryList = [albviz.ALL_CATEGORIES].concat(albviz.CATEGORIES);
    var categorySelect = d3.select('#category-select select');

    categorySelect.selectAll('option')
        .data(categoryList).enter()
        .append('option') 
        .attr('value', function(d) {return d;})
        .html(function(d) { return d;});

    categorySelect.on('change', function(d) {
        var category = d3.select(this).property('value');
        albviz.filterByCategory(category);
        albviz.onDataChange();
    });



}(window.albviz = window.albviz || {}));    