var API_URL = 'http://localhost:5000/api';

var displayJSON = function(query) {
    d3.json(API_URL + query, function(error, data) {
        // log errors to the console as a warning
        if(error){
            return console.warn(error);
        }
        d3.select('#query pre').html(query);
        d3.select('#data pre').html(JSON.stringify(data, null, 4));
        console.log(data);
    });
};

var query = '/albums?where=' + JSON.stringify({
    "artist": "Michael Jackson",
});

displayJSON(query);
