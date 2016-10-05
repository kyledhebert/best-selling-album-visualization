import scrapy


from album_scraper.items import AlbumCoverScraperItem

BASE_URL = 'https://en.wikipedia.org'


class AlbumCoverSpider(scrapy.Spider):
    """Scrapes the album cover from the album's wikipedida page"""

    name = 'album_covers'
    allowed_domains = ['en.wikipedia.org']
    start_urls = [
        'https://en.wikipedia.org/wiki/List_of_best-selling_albums'
    ]
    # we only want this pipeline run in conjunction
    # with this spider
    ITEM_PIPELINES = {
        'album_scraper.pipelines.AlbumCoverPipeline': 300,
    }
    
    def parse(self, response):
        # we don't want the last table on the page
        tables = response.css('.sortable')

        for table in tables:
            # we want to ignore the last table on the oage
            if not(table == tables[3]):
                rows = table.xpath('tr')
                for row in rows:
                    album_data = {}
                    # we need to start from second row -- first row is a header row
                    if not (row == rows[0]):
                        album_data['album'] = row.xpath('td[2]/i/a/text()').extract()
                        
                        # for the links we need to append the scraped
                        # href to the BASE_URL
                        # for some albums the artist isn't linked, so
                        # we also need to check for that
                        if not (row.xpath('td[2]/i/a/@href').extract_first()
                                is None):
                            album_link = BASE_URL + \
                                row.xpath('td[2]/i/a/@href').extract()[0]
                        else:
                            album_link = ''
                        album_data['album_link'] = album_link

                        # follow the link to the album page to get 
                        # the cover art and image data
                        request = scrapy.Request(album_data['album_link'], 
                                                 callback=self.get_album_cover)
                        request.meta['item'] = AlbumCoverScraperItem(**album_data)
                        yield request

    def get_album_cover(self, response):
        item = response.meta['item']
        item['image_urls'] = []  
        img_src = response.xpath(
            '//table[contains(@class, "infobox")]//img/@src')
        if img_src:
            item['image_urls'] = ['https:' + img_src[0].extract()]
        yield item    
