# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import scrapy
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem


class AlbumCoverPipeline(ImagesPipeline):
    def get_image_requests(self, item, info):
        """Uses the image urls scraped by AlbumCoverSpider and creates
        an http request for their content"""
        for image_url in item['image_urls']:
            yield scrapy.Request(image_url)

    def item_completed(self, results, item, info):
        """Completes the AlbumCoverSpider item by adding the
        image file to the item after the requests are completed"""

        # filters the results for successful requests and stores
        # the file to the directory specified in settings.py
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise DropItem('Item contains no images')
        if image_paths:
            item['album_art'] = image_paths[0]

        return item 
