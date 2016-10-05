# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class AlbumScraperItem(scrapy.Item):
    artist = scrapy.Field()
    artist_link = scrapy.Field()
    album = scrapy.Field()
    album_link = scrapy.Field()
    year = scrapy.Field()
    genre = scrapy.Field()
    sales = scrapy.Field()


class AlbumCoverScraperItem(scrapy.Item):
    album = scrapy.Field()
    album_link = scrapy.Field()
    image_urls = scrapy.Field()
    album_art = scrapy.Field()
    images = scrapy.Field()
