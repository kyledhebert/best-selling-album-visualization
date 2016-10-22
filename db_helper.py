import click
import json
from pymongo import MongoClient
from visualization.api.settings import MONGO_URI

ALBUM_TABLE = 'albums_full'
ALBUM_DB = 'album_sales'

mongoClient = MongoClient(MONGO_URI)
album_db = mongoClient.get_default_database()

@click.group()
def cli():
    pass

@click.command()
def seed_db():
    """Loads the album_sales database with the album data."""
    albums_full = json.load(open('data/albums_full.json'))    
    album_db[ALBUM_TABLE].drop()
    album_db[ALBUM_TABLE].insert_many(albums_full)

    print('Loaded the database with %d albums' %album_db[ALBUM_TABLE].count())

@click.command()
def drop_db():
    """Drops the album_sales database from MongoDB."""
    mongoClient.drop_database(ALBUM_DB)

    print('Dropped the %s database from MongoDB' %ALBUM_DB)

cli.add_command(seed_db)    
cli.add_command(drop_db)

if __name__ == '__main__':
    cli()

