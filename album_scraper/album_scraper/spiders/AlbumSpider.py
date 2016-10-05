import scrapy

from album_scraper.items import AlbumScraperItem

BASE_URL = 'https://en.wikipedia.org'


class AlbumSpider(scrapy.Spider):
    """Scrapes the artist name, album name, genre, and numbers sold of the
    top-selling items"""

    name = 'album_list'
    allowed_domains = ['en.wikipedia.org']
    start_urls = [
        'https://en.wikipedia.org/wiki/List_of_best-selling_albums'
    ]

    def parse(self, response):
        item = AlbumScraperItem()
                
        # all of the albums are in sortable tables on the page
        tables = response.css('.sortable')

        for table in tables:
            # we don't want the last table on the page
            if not (table == tables[3]):
                rows = table.xpath('tr')
                for row in rows:
                    # we need to start from second row -- first row is a header row
                    if not (row == rows[0]):

                        # some artists aren't linked, so we need to look
                        # for links before extracting text
                        # we check the length of the extracted array to
                        # determine if there is a link
                        # checking the value of extract_first() did not
                        # work for this cell
                        if (len(row.xpath('.//td[1]/a/@href').extract())):
                            item['artist'] = \
                                row.xpath('td[1]/a/text()').extract()[0]
                        else:
                            item['artist'] = \
                                row.xpath('td[1]/text()').extract()[0]

                        item['album'] = \
                            row.xpath('td[2]/i/a/text()').extract()[0]
                        
                        # for the links we need to append the scraped
                        # href to the BASE_URL
                        # for some albums the artists isn't linked, so
                        # we also need to check for that
                        if not (row.xpath('td[1]/a/@href').extract_first()
                                is None): 
                            artist_link = BASE_URL + \
                                row.xpath('td[1]/a/@href').extract()[0]
                        else:
                            artist_link = ''
                        item['artist_link'] = artist_link

                        if not (row.xpath('td[2]/i/a/@href').extract_first()
                                is None):
                            album_link = BASE_URL + \
                                row.xpath('td[2]/i/a/@href').extract()[0]
                        else:
                            album_link = ''
                        item['album_link'] = album_link
                            
                        item['year'] = int(row.xpath('td[3]/text()')
                                           .extract()[0])

                        # sometimes genre is linked, so we need to look for 
                        # links and extract link text if they are present,
                        # otherwise we just need the the text

                        # we also are only going to extract the primary genre 
                        # (first listed) not each genre for a given album
                        if (row.xpath('td[4]/a/text()').extract_first() is None):
                            genres = row.xpath('td[4]/text()').extract()[0]
                            item['genre'] = self.get_first_genre(genres)
                        else:
                            item['genre'] = \
                                row.xpath('td[4]/a/text()').extract()[0]

                        # for 30 - 40+ million sales, the sales number is 
                        # contained in a NavFrame, we need to check for that
                        # first, otherwise just extract the text from the td
                        if (row.xpath('td[5]/text()').extract_first() is '\n'):
                            item['sales'] = \
                                row.xpath('td[5]/div/div/text()').extract()[0]
                        else:      
                            item['sales'] = int(row.xpath('td[5]/text()')
                                                .extract()[0])
                    yield item

    def get_first_genre(self, genres):
        return [x.strip() for x in genres.split(',')][0]                