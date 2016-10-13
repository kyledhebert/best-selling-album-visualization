(function(albviz) {
    'use strict';

    albviz.ALL_SALES = 'All Sales Categories';
    albviz.CATEGORIES = ["40+", "30-39", "20-29"];
    albviz.TRANS_DURATTION = 2000; //time of transition animations

    // creates a hexidecimal color based on category
    albviz.categoryFill = function(category) {
        var i = albviz.CATEGORIES.indexOf(category);
        return df.hcl(i / albviz.CATEGORIES.length * 360, 60, 70);
    };

    albviz.data = {};
    albviz.activeGenre = null;
    albviz.activeCategory = albviz.ALL_SALES;


    albviz.getDataFromAPI = function(resource, callback){
        d3.json("http://localhost:5000/api/" + resource, function(error, data) {
            if(error) {
                return callback(error);
            }
            if('_items' in data) {
                callback(null, data._items);
            }
            else {
                callback(null, data);
            }
        });
    };

    var nestDataByYear = function(entries) {
        // ...
    };

    albviz.makeFilterAndDimensions = function(albumData) {
        albviz.filter = crossfilter(albumData);
        albviz.genreDim = albviz.filter.dimension(function(o){
            return o.genre;
        });
    };

    albviz.filterByGenres = function(genres) {
        // ...
    };

    albviz.getGenreData = function() {
        // uses Crossfilter dimension to group genres into key value counts {key:Rock, value: 5}
        var genreGroups = albviz.genreDim.group().all();
        var data = genreGroups.sort(function(a, b) {
            return b.value - a.value; //descending order
        });

        return data;
    };

    albviz.onDataChange = function() {
        var data = albviz.getGenreData();
        // albviz.updateGenreBarChart(data);
        // albviz.updateSalesBarChart(data);
        albviz.updateList(albviz.genreDim.top(Infinity));
        // data = nestDataByYear(albviz.genreDim.top(Infinity));
        // albviz.updateTimeChart(data);
    };

}(window.albviz = window.albviz || {}));