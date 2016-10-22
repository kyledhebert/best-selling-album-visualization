import os


MONGO_URI = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/album_sales')
MONGO_DBNAME = 'album_sales'

URL_PREFIX = 'api'
DOMAIN = {
    'albums_full': {
        'item_title': 'albums',
        'schema': {
            'album_x': {'type': 'string'},
            'artist': {'type': 'string'},
            'genre': {'type': 'string'},
            'sales': {'type': 'integer'},
            'year': {'type': 'integer'},
            'album_art': {'type': 'string'},
            'category': {'type': 'string'}
        },
        'url': 'albums'
    }
}
# allows our api and app server to run on the same domain
X_DOMAINS = 'http://localhost:8080'
HATEOAS = False
PAGINATION = False
