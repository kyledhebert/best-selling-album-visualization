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

        // set up the Crosfillter filter and dimensions
        albviz.makeFilterAndDimensions(albumData);
        // update the app based on menu selection
        albviz.onDataChange();
    }  
}(window.albviz = window.albviz || {}));