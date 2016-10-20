describe('Test albviz_core.js functions', function() {
    var testData = [
        {
            "album_x": "Thriller",
            "album_link": "https://en.wikipedia.org/wiki/Thriller_(Michael_Jackson_album)",
            "artist": "Michael Jackson",
            "artist_link": "https://en.wikipedia.org/wiki/Michael_Jackson",
            "genre": "Pop",
            "sales": 46.0,
            "year": 1982,
            "album_y": "Thriller",
            "album_art": "full/117b9206909a414cb34975b52ce256f74946a309.jpg",
            "image_urls": [
              "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Michael_Jackson_-_Thriller.png/220px-Michael_Jackson_-_Thriller.png"
            ],
            "category": "30+"
        },
        {
            "album_x": "Back in Black",
            "album_link": "https://en.wikipedia.org/wiki/Back_in_Black",
            "artist": "AC/DC",
            "artist_link": "https://en.wikipedia.org/wiki/AC/DC",
            "genre": "Hard rock",
            "sales": 26.1,
            "year": 1980,
            "album_y": "Back in Black",
            "album_art": "full/cbabf3f5af573928bb4e4711cb9c0f4062a513e3.jpg",
            "image_urls": [
              "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/ACDC_Back_in_Black.png/220px-ACDC_Back_in_Black.png"
            ],
            "category": "20-29"
        },
        {
            "album_x": "Sgt. Pepper's Lonely Hearts Club Band",
            "album_link": "https://en.wikipedia.org/wiki/Sgt._Pepper%27s_Lonely_Hearts_Club_Band",
            "artist": "The Beatles",
            "artist_link": "https://en.wikipedia.org/wiki/The_Beatles",
            "genre": "Rock",
            "sales": 13.1,
            "year": 1967,
            "album_y": "Sgt. Pepper's Lonely Hearts Club Band",
            "album_art": "full/35def39860350c89a64e2464412bf5f54cced9a9.jpg",
            "image_urls": [
              "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg/220px-Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg"
            ],
            "category": "10-19"
        },
    ];

    var result;

    it('should group genres and provide a count', function() {
        albviz.makeFilterAndDimensions(testData);
        result = albviz.getGenreData();

        expect(result.length).toBe(3);
        expect(result[0].key).toBe('Hard rock');
        expect(result[0].value).toBe(1);
    });

    it('should show correct color for category', function() {
        var color = albviz.categoryFill('10-19');
        expect(color.toString()).toBe('#00bfff');
    });

    it('should filter albums by genre', function() {
        albviz.makeFilterAndDimensions(testData);
        albviz.filterByGenre(['Rock']);
        result = albviz.genreDim.top(Infinity);

        expect(result.length).toBe(1);
        expect(result[0].album_x).toBe('Sgt. Pepper\'s Lonely Hearts Club Band');

        albviz.filterByGenre([]);
        result = albviz.genreDim.top(Infinity);

        expect(result.length).toBe(3);
        expect(result[2]).toEqual(testData[1]);
    });

    it('should filter albums by category', function() {
        albviz.makeFilterAndDimensions(testData);
        albviz.filterByCategory("30+");
        result = albviz.categoryDim.top(Infinity);

        expect(result.length).toBe(1);
        expect(result[0]).toEqual(testData[0]);    

        albviz.filterByCategory();
        result = albviz.categoryDim.top(Infinity);

        expect(result.length).toBe(3);
        expect(result[2]).toEqual(testData[2]);
    });
});