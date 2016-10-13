(function(albviz) {
    'use strict';

    albviz.updateList = function(data) {
        var rows, cells;

        data = data.sort(function(a,b) {
            return +b.year - +a.year;
        });

        // bind the album data to the table rows
        rows = d3.select("#album-list tbody")
            .selectAll('tr')
            .data(data);

        rows.enter().append('tr')
            .on('click', function(d) {
                console.log('You clicked a row ' + JSON.stringify(d));
                albviz.displayAlbum(d);
            });

        // this will fade out the rows slowly
        rows.exit()
            .transition().duration(albviz.TRANS_DURATION) 
            .style('opacity', 0)
            .remove();

        cells = rows.selectAll('td')
            .data(function(d) {
                return [d.year, d.artist, d.album_x];
            });

        // place the data in the cells, then set the text
        cells.enter().append('td');
        cells.text(function(d) {
            return d;
        });

        // display a random album if the data is available
        if(data.length) {
            albviz.displayAlbum(data[Math.floor(Math.random() * data.length)]);
        }

    };

    albviz.displayAlbum =function(_wData) {
        
        albviz.getDataFromAPI('albums/' + _wData._id, function(error, wData) {
            if (error) {
                return console.warn(error);
            }
            var selected_album = d3.select('#selected-album');

            // add an image if one is available, otherwise remove the existing
            if(wData.album_art) {
                selected_album.select('#coverbox img')
                    .attr('src', 'static/images/' + wData.album_art)
                    .style('display', 'inline');
            }
            else {
                selected_album.select('#coverbox img').style('display', 'none');
            }
        });
    };
    


}(window.albviz = window.albviz || {}));