URL_PREFIX = 'api'
MONGO_DBNAME = 'album_sales'
DOMAIN = {
    'albums_full': {
        'item_title': 'albums',
        'schema': {
            'album_x': {'type': 'string'},
            'artist': {'type': 'string'},
            'genre': {'type': 'string'},
            'sales': {'type': 'integer'},
            'year': {'type': 'integer'},
            'album_art': {'type': 'string'}
        },
        'url': 'albums'
    }
}
# allows our api and app server to run on the same domain
X_DOMAINS = 'http://localhost:8080'
HATEOAS = False
PAGINATION = False
