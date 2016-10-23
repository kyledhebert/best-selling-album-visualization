(function(albviz) {
    'use strict';

    albviz.ALL_CATEGORIES = 'All Categories';
    albviz.CATEGORIES = ["30+", "20-29", "10-19"];
    albviz.TRANS_DURATION = 2000; //time of transition animations

    // creates a hexidecimal color based on category
    albviz.categoryFill = function(category) {
        var i = albviz.CATEGORIES.indexOf(category);
        return d3.hcl(i / albviz.CATEGORIES.length * 360, 60, 70);
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
        return albviz.data.years = d3.nest()
            .key(function(w) {
                return w.year;
            })
            .entries(entries);
    };

    albviz.makeFilterAndDimensions = function(albumData) {
        // adds the filter
        albviz.filter = crossfilter(albumData);
        // creates a genre dimension
        albviz.genreDim = albviz.filter.dimension(function(o){
            return o.genre;
        });

        // creates a category dimension
        albviz.categoryDim = albviz.filter.dimension(function(o) {
            return o.category;
        });
    };

    albviz.filterByGenre = function(genres) {
        // resets the filter if the genres array is empty
        // i.e. the user has chosen All Genres
        if (!genres.length) {
            albviz.genreDim.filter();
        }
        else {
            albviz.genreDim.filter(function(genre) {
                // returns true if a genre is in the genres list
                return genres.indexOf(genre) > -1;
            });
        }

        // keeps a record of any single selected genre
        if (genres.length === 1) {
            albviz.activeGenre = genres[0];
        }
        else {
            albviz.activeGenre = null;
        }
    };

    albviz.filterByCategory = function(cat) {
        albviz.activeCategory = cat;

        if (cat === albviz.ALL_CATEGORIES) {
            albviz.categoryDim.filter();
        }
        else {
            albviz.categoryDim.filter(cat);
        }
    };

    // uses Crossfilter dimension to group genres into key value counts {key:Rock, value: 5}
    albviz.getGenreData = function() {
        var genreGroups = albviz.genreDim.group().all();

        var data = genreGroups.map(function(c) {
            var value = c.value;
            return {
                key: c.key,
                value: value
            };
        })
            .sort(function(a,b) {
                // descending order
                return b.value - a.value;
            });

        return data;
    };

    albviz.onDataChange = function() {
        var data = albviz.getGenreData();
        albviz.updateGenreBarChart(data);
        albviz.updateList(albviz.genreDim.top(Infinity));
        data = nestDataByYear(albviz.genreDim.top(Infinity));
        albviz.updateTimeChart(data);
    };

}(window.albviz = window.albviz || {}));