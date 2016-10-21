(function(albviz) {
    'use strict';

    // projection excludes the album art from the initial query
    var query_albums = 'albums?projection=' +
    JSON.stringify({"album_art":0});

    var q = queue()
            .defer(albviz.getDataFromAPI, query_albums);
    
    q.await(ready);

    function ready(error, albumData) {
        if(error) {
            return console.warn(error);
        }

        albviz.makeFilterAndDimensions(albumData);
        albviz.initializeStaticCharts();
        albviz.onDataChange();
        console.log("Data retrieved");
    }  
}(window.albviz = window.albviz || {}));