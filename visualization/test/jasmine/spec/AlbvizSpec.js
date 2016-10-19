describe('Albvix core functions', function() {
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
    "album_x": "The Dark Side of the Moon",
    "album_link": "https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon",
    "artist": "Pink Floyd",
    "artist_link": "https://en.wikipedia.org/wiki/Pink_Floyd",
    "genre": "Progressive rock",
    "sales": 24.2,
    "year": 1973,
    "album_y": "The Dark Side of the Moon",
    "album_art": "full/e07bb06a17c43e84134497fc6a2642146ba3f5a3.jpg",
    "image_urls": [
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png"
    ],
    "category": "20-29"
  }
    ];
});

var result;

it('should show correct color for category', function() {
    var color = albviz.categoryFill('20-29');
    expect(color.toString()).toBe()('#781417');
});